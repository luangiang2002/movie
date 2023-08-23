import './homepage.scss';
import './PageVideo/PageVideo.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularVideo, getVideoByCategoryG } from '../redux/action/videoAction';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { getYoutubeClick } from './GetAddWatches';
import moment from 'moment';
import { BeatLoader } from 'react-spinners';
const keyword = [
    'Tất cả',
    'Âm nhạc',
    'Trực tiếp',
    'Danh sách kết hợp',
    'Tin tức',
    'Hoạt họa',
    'Hoạt hình',
    'Mới tải lên gần đây',
    'Thịnh hành',
    'Đề xuất mới',
];

function HomePage() {
    const dispatch = useDispatch();
    const [active, setActive] = useState('Tất cả');
    const handleClick = (value) => {
        setActive(value);
        if (value === 'Tất cả') {
            dispatch(getPopularVideo());
        } else {
            dispatch(getVideoByCategoryG(value));
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        dispatch(getPopularVideo());
    }, [dispatch]);
    const { videos } = useSelector((state) => state.homeVideos);

    const [isLoading, setIsLoading] = useState(false);

    const fetchData = () => {
        if (!isLoading) {
            setIsLoading(true);
            if (active === 'Tất cả') {
                dispatch(getPopularVideo());
                setIsLoading(false);
            } else {
                dispatch(getVideoByCategoryG(active));
                setIsLoading(false);
            }
        }
    };

    const uniqueVideos = [];
    const existingTitles = [];

    for (const video of videos) {
        if (!existingTitles.includes(video.snippet.title)) {
            existingTitles.push(video.snippet.title);
            uniqueVideos.push(video);
        }
    }
    const { firebaseId } = useSelector((state) => state.imageAvatar);
    const navigate = useNavigate();

    const handleVideoClick = async (video) => {
        const id = video.id?.videoId || video.id || null;

        await getYoutubeClick(video, id, firebaseId, dispatch);

        navigate(`/homevideo/${id}`);
    };
    const handleChannel = (video) => {
        navigate(`/channel/${video?.snippet?.channelId}`);
    };
    return (
        <div className="homepage">
            <div className="homepage_category">
                {keyword.map((value, i) => (
                    <div
                        className={`category__item-wrapper ${active === value ? 'active' : ''}`}
                        onClick={() => handleClick(value)}
                        key={i}
                    >
                        <p>{value}</p>
                    </div>
                ))}
            </div>
            <InfiniteScroll
                dataLength={videos?.length}
                next={fetchData}
                hasMore={true}
                loader={<BeatLoader color="#36d7b7" />}
                scrollThreshold={0.8}
                className="homepage_homevideo"
            >
                {uniqueVideos.map((video, index) => (
                    <div className="pagevideo" key={index}>
                        <div className="pagevideo_video">
                            <div className="pagevideo_video--duration" onClick={() => handleVideoClick(video)}>
                                <img src={video?.snippet?.thumbnails?.medium?.url} alt="" />
                            </div>
                            <div className="pagevideo_video--detail d-flex w-100">
                                <div className="pagevideo_content">
                                    <div className="pagevideo__title-wrapper">
                                        <h4 className="pagevideo_title" onClick={() => handleVideoClick(video)}>
                                            {video?.snippet?.title}
                                        </h4>
                                    </div>
                                    <p className="pagevideo__author-text" onClick={() => handleChannel(video)}>
                                        {video?.snippet?.channelTitle}
                                    </p>
                                    <p className="pagevideo_sub">{moment(video?.snippet?.publishedAt).fromNow()} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default HomePage;
