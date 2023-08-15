import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';
const AutoplayVideo = ({ video }) => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const handleVideoChange = (inView, index) => {
        if (inView) {
            setCurrentVideoIndex(index);
        }
    };

    const handleVideoPlay = (index) => {
        if (index !== currentVideoIndex) {
            setCurrentVideoIndex(index);
        }
    };

    const handleVideoPause = () => {
        // Đặt currentVideoIndex thành null khi video dừng
        setCurrentVideoIndex(null);
    };
    return (
        <>
            {video?.short?.map((videoId, index) => (
                <InView
                    as="div"
                    onChange={(inView) => handleVideoChange(inView, index)}
                    key={index}
                    data-index={index}
                    className="short_video_inview"
                >
                    <ReactPlayer
                        playing={index === currentVideoIndex}
                        loop={true}
                        volume={1}
                        controls={true}
                        muted={false}
                        url={`//www.youtube.com/embed/${videoId.videoId}?autoplay=1`}
                        className="short_video_inview--player"
                        onPlay={() => handleVideoPlay(index)}
                        onPause={handleVideoPause}
                    />
                </InView>
            ))}
        </>
    );
};

export default AutoplayVideo;
