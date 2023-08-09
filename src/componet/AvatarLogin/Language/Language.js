import React from 'react'
import './language.scss'
import { GrLinkPrevious } from 'react-icons/gr'
const Language = ({setShowhandleLanguage}) => {
    const handleGoBack=()=>{
        setShowhandleLanguage(false)
    }
  return (
    <div>
 <>
            <div className="interface">
                <div>
                    <GrLinkPrevious onClick={handleGoBack} />
                    <p>Chọn ngôn ngữ của bạn</p>
                </div>
                <hr />
                <p>Tiếng Anh</p>
                <p>Tiếng việt</p>
            </div>
        </>
    </div>
  )
}

export default Language