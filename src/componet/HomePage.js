
import './homepage.scss';
import PageVideo from './PageVideo/PageVideo';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoByCategory } from '../redux/action/videoAction';
import { useEffect, useState } from 'react';

const keyword = [
  'New',
  'Âm nhạc',
  'trực tiếp',
  'Danh sách kết hợp',
  'Trò chơi',
  'Hoạt họa',
  'Hoạt hình',
  'Mới tải lên gần đây',
  'Thịnh hành',
  'Đề xuất mới'
];

function HomePage({ handleToggleSidebar, sidebar }) {
  const dispatch = useDispatch();
  const { video, loading } = useSelector(state => state.search);
  const [active, setActive] = useState('New');

  useEffect(() => {
    dispatch(getVideoByCategory(active));
  }, [active, dispatch]);

  const handleClick = (value) => {
    setActive(value);
  };

  const _video = video?.video;

  return (
    <div className="homepage">

      <div className='homepage_category'>
        {keyword.map((value, i) => (
          <p
            className={active === value ? 'homepage_category_active' : 'homepage_category_content item'}
            key={i}
            onClick={() => handleClick(value)}
          >
            {value}
          </p>
        ))}
      </div>

      <div className='homepage_homevideo'>
        {!loading && _video && _video.map((video, i) => <PageVideo video={video} key={i} />)}
      </div>
    </div>
  );
}

export default HomePage;
