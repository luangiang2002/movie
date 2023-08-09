import React, { useEffect } from 'react'
import './video.scss'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import ShowMoreText from "react-show-more-text";
import Comments from './comment/Coments'

import numeral from 'numeral';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import { getComment } from '../../../redux/action/videoAction';
import { useNavigate } from 'react-router-dom';

const Video = ({ id,video }) => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const { comment ,loading} = useSelector(state => state.comment) 
    const channeId=video[0].snippet.channelId
    const handleComment=()=>{

    }
    const handleChannel=()=>{
        navigate( `/channel/${channeId}`)
    }
    useEffect(() => {
            dispatch(getComment(id))
    }, [dispatch,id])
    const _comment=comment.video
    return (
        <>
            <div className=' video'>
                <iframe width="100%"
                    src={`https://www.youtube.com/embed/${id}`}
                    allow="fullscreen"
                    title={video[0]?.snippet?.title}
                >
                </iframe>
                <p>{video[0]?.snippet?.title}</p>
                <div className="video_author d-flex">
                    <div className="video_author--icon d-flex">
                        <img src={video[0]?.snippet?.thumbnails?.default?.url} alt="" />
                        <p onClick={handleChannel}>{video[0]?.snippet?.channelTitle} </p>
                        <button>Đăng kí</button>
                    </div>
                    <div className="video_author--subcript">
                    </div>
                    <div className='video_author--like d-flex'>
                        <p><AiOutlineLike /> <span>{numeral(video[0]?.statistics?.likeCount).format('0.a')}</span></p>
                        <hr />
                        <p><AiOutlineDislike /> <span>{numeral(video[0]?.statistics?.favoriteCount).format('0.a')}</span></p>
                    </div>
                </div>
                <div className="video_description">
                    <ShowMoreText
                        lines={2}
                        more="Hiện thêm"
                        less="Ẩn bớt"
                        className="content-css"
                        anchorClass="show-more-less-clickable"
                        expanded={false}
                        truncatedEndingComponent={"... "}
                    >
                        <span>{moment(video[0]?.snippet?.publishedAt).fromNow()}</span> <br />
                        {video[0]?.snippet?.description}
                    </ShowMoreText>
                </div>
            </div>
            <div className="comments">
                <div className="comments_input d-flex">
                    <img src="https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png" alt="" />
                    <input type="text" placeholder='Viết bình luận' />
                    <button onClick={handleComment}>Comment</button>
                </div>
                {!loading && _comment?.map((comment, i) => (
                    <Comments comment={comment} key={i} />
                ))}
            </div>
        </>
    )
}

export default Video;