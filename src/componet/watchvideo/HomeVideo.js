import React, { useEffect } from 'react';
import './homevideo.scss';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoId } from '../../redux/action/videoAction';
import Video from './Video/Video';
const HomeVideo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { videoid, loading } = useSelector((state) => state?.videoid);
    useEffect(() => {
        dispatch(getVideoId(id));
    }, [dispatch, id]);
    return (
        <div className=" homevideo">
            <Row>
                <Col lg={12}>{!loading && videoid ? <Video id={id} video={videoid} /> : <h6>Loading</h6>}</Col>
            </Row>
        </div>
    );
};

export default HomeVideo;
