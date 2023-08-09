import React  from 'react';
import './home.scss';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Home = ({ video }) => {
    const navigate = useNavigate()
    const handleVideo = () => {
        navigate(`/homevideo/${video?.id?.videoId}`)
    }
    return (
        <div className='home'>
            <div className='home_list--video' >
                <div className='home_list--video--duration'>
                    <img src={video?.snippet?.thumbnails?.default?.url} alt='' onClick={() => handleVideo()} />
                </div>
                <div className='home_list--video--detail d-flex w-100'>
                    <div className='home_list--content'>
                        <h4 className='home_list--title'>{video?.snippet?.title} </h4>
                        <p className='home_list--sub'>
                            {moment(video?.snippet?.publishedAt).fromNow()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
