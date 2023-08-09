import React, { useEffect, useState } from 'react';
import './comments.scss';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import moment from 'moment';
import DOMPurify from 'dompurify';

const Comments = ({ comment }) => {
  const [data, setData] = useState('');

  useEffect(() => {
    // Kiểm tra comment trước khi trích xuất dữ liệu từ API
    if (comment?.snippet?.topLevelComment?.snippet?.textDisplay) {
      // Trích xuất nội dung bình luận từ API
      const rawDataFromAPI = comment.snippet.topLevelComment.snippet.textDisplay;

      // Sử dụng DOMPurify để loại bỏ các thẻ <a> và các thuộc tính của chúng (ví dụ: href)
      const cleanedData = DOMPurify.sanitize(rawDataFromAPI, {
        ADD_TAGS: ['span'], // Thêm thẻ <span> để thay thế các thẻ <a>
        ADD_ATTR: ['class'], // Thêm thuộc tính class cho thẻ <span> để sử dụng nhưng không cần thiết cho quá trình loại bỏ
        FORBID_TAGS: ['a'], // Cấm các thẻ <a> hoàn toàn
        FORBID_ATTR: ['href'], // Cấm tất cả các thuộc tính của thẻ <a>
      });

      setData(cleanedData);
    }
  }, [comment]);

  return (
    <>
      <div className='comments'>
        <div className='comments_comment d-flex'>
          <img src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt='' />
          <div className='comments_comment--author'>
            <div className=''>
              <p>
                <b>{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}</b>{' '}
                <span>{moment(comment?.snippet?.topLevelComment?.snippet?.publishedAt).fromNow()}</span>
              </p>
              {/* Sử dụng biến data đã được xử lý để hiển thị nội dung bình luận */}
              <p dangerouslySetInnerHTML={{ __html: data }} />
            </div>
            <div className='d-flex'>
              <p>
                <AiOutlineLike />
                <span>{comment?.snippet?.topLevelComment?.snippet?.likeCount}</span>
              </p>
              <hr />
              <p>
                <AiOutlineDislike />
                <span>0</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
