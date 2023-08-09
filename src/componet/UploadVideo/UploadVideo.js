import React from 'react'
import './uploadVideo.scss'
import FileUploader from './FileUploader'
const UploadVideo = () => {
  const userInfo = JSON.parse(localStorage.getItem('watch-user'));

  return (
    <div className='upload'>
          <FileUploader userInfo={userInfo} />
    </div>

  )
}

export default UploadVideo