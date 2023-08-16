import React, { useEffect } from 'react';
import './Short.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getShort } from '../../redux/action/toggleAction';
import AutoplayVideo from './AutoplayVideo';
import { PropagateLoader } from 'react-spinners';
const Short = () => {
    const { short, loading } = useSelector((state) => state.short);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getShort());
    }, [dispatch]);
    return (
        <div className="short">
            <div className="short_video">
                {!loading && short && short?.short ? (
                    <AutoplayVideo video={short} />
                ) : (
                    <PropagateLoader color="#36d7b7" />
                )}
            </div>
        </div>
    );
};
// ShortItem
export default Short;
