import React, { useEffect } from 'react'
import './homevideo.scss'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoAction, getVideoWatch } from '../../redux/action/videoAction';
import Video from './Video/Video';
import NextVideo from './NextVideo/NextVideo';
const HomeVideo = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { video, loading } = useSelector(state => state.videowatch?.video)
    const { videos } = useSelector(state => state.videoDetail)
    useEffect(() => {
        dispatch(getVideoAction(id))
    }, [dispatch, id])
    useEffect(() => {
        if (videos?.videos && videos.videos.length > 0) {
            const channeId = videos.videos[0].snippet.channelId;
            dispatch(getVideoWatch(channeId));
        }
    }, [videos, dispatch]);
    return (
        <div className=' homevideo'>
            <Row >
                <Col lg={8}>
                    {
                        !loading && video ? <Video id={id} video={video} />
                            : <h6>Loading</h6>
                    }
                </Col>
                <Col lg={4}>
                    <div className='homevideo_nextvideo'>
                        {
                            !loading ?
                                videos?.videos?.map((videoItem, i) => (
                                    <NextVideo key={i} videos={videoItem} />
                                ))
                                : <h6>Loading</h6>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HomeVideo;