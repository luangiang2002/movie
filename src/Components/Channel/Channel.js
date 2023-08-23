import React, { useEffect } from 'react';
import './Channel.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel, getVideoWatch } from '../../redux/action/videoAction';
import ChannelVideo from './ChannelVideo/ChannelVideo';
import moment from 'moment';
const Channel = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { video, loading } = useSelector((state) => state.videowatch?.video);
    const { channel } = useSelector((state) => state.channel);

    useEffect(() => {
        dispatch(getVideoWatch(id));
        dispatch(getChannel(id));
    }, [dispatch, id]);
    function formatNumber(number) {
        if (number >= 1000000000) {
            const billion = (number / 1000000000).toFixed(1);
            return billion.endsWith('.0') ? billion.slice(0, -2) + ' T' : billion + ' T';
        } else if (number >= 1000000) {
            const million = (number / 1000000).toFixed(1);
            return million.endsWith('.0') ? million.slice(0, -2) + ' Tr' : million + ' Tr';
        } else if (number >= 1000) {
            const thousand = (number / 1000).toFixed(1);
            return thousand.endsWith('.0') ? thousand.slice(0, -2) + ' N' : thousand + ' N';
        } else {
            return number.toFixed(0);
        }
    }
    return (
        <div className="channel">
            <div className="channel_banner">
                {!loading && channel && channel?.channel && (
                    <>
                        <div>
                            <img src={channel?.channel[0].snippet?.thumbnails?.default?.url} alt="" />
                            <h4>{channel?.channel[0].snippet?.title}</h4>
                            <p>{formatNumber(channel?.channel[0].statistics?.subscriberCount)} subscript</p>
                            <p>{moment(channel?.channel[0].snippet?.publishedAt).fromNow()} </p>
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
