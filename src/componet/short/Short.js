import React, { useEffect } from 'react'
import './short.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getShort } from '../../redux/action/toggleAction'
import AutoplayVideo from './AutoplayVideo'
const Short = ({ sidebar, handleToggleSidebar }) => {
    const { short, loading } = useSelector(state => state.short)
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getShort())
    }, [dispatch])
    const videoIds = ['GStRLppm_0k', '3CI20GQhekE', 'hiE2su_BapQ', '3u9Q-Z672w4', '-DWksaMuQOw', 'hPG2nU0UsTA'];
    return (
        <div className='short'>
            <div className='short_video'>
                {
                    !loading && short && short?.short ?
                        (
                         <AutoplayVideo videoIds={videoIds} video={short}  />
                            )
                        
                        :
                        <p>loading...</p>
            }

               
            </div>
        </div>
    )
}
// ShortItem
export default Short