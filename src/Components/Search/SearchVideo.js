import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Search/video/Search.scss';

import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Search from './video/Search';
import { getVideoByCategory } from '../../redux/action/videoAction';
import SearchApp from './video/SearchApp';
import { GetVideoData } from '../App/HomeApp/VideoApp/GetData';
import { videoUpload } from '../../redux/action/VideoActionApp';
const SearchVideo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { video, loading } = useSelector((state) => state.search.video);
    const [firestoreResults, setFirestoreResults] = useState([]);
    const { videos } = useSelector((state) => state.videosapp);

    useEffect(() => {
        const filteredResults = videos.filter((video) => video.title.toLowerCase().includes(id.toLowerCase()));
        setFirestoreResults(filteredResults);
    }, [videos, id]);

    useEffect(() => {
        (async () => {
            const videos = await GetVideoData();
            dispatch(videoUpload(videos));
        })();
    }, [dispatch]);
    useEffect(() => {
        dispatch(getVideoByCategory(id));
    }, [dispatch, id]);
    return (
        <div className="search">
            <Row>
                <Col>
                    <div className="search_video">
                        {!loading && <SearchApp firestoreResults={firestoreResults} />}
                        {!loading ? (
                            video?.map((video, i) => (
                                <Search video={video} key={i} firestoreResults={firestoreResults} id={id} />
                            ))
                        ) : (
                            <p>Load...</p>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SearchVideo;
