import React, { useEffect } from 'react';
import './Channel.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel, getVideoWatch } from '../../redux/action/videoAction';
import ChannelVideo from './ChannelVideo/ChannelVideo';

const Channel = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { video, loading } = useSelector((state) => state.videowatch?.video);
    const { channel } = useSelector((state) => state.channel);

    useEffect(() => {
        dispatch(getVideoWatch(id));
        dispatch(getChannel(id));
    }, [dispatch, id]);
    return (
        <div className="channel">
            <div className="channel_banner">
                {!loading && channel && channel?.channel && (
                    <>
                        <div>
                            <img src={channel?.channel[0].snippet?.thumbnails?.default?.url} alt="" />
                            <p>{channel?.channel[0].snippet?.title}</p>
                            <p>{channel?.channel[0].statistics?.subscriberCount} Subscriber</p>
                        </div>
                    </>
                )}
            </div>
            <div className="channel_category">
                {!loading && video ? (
                    video
                        .filter((videoItem) => videoItem.id?.videoId !== undefined && videoItem.id?.videoId !== '')
                        .map((videoItem, i) => <ChannelVideo video={videoItem} loading={loading} key={i} />)
                ) : (
                    <p>load...</p>
                )}
            </div>
        </div>
    );
};

export default Channel;
