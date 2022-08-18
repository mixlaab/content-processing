import React from 'react'
import { useState } from 'react'
import { useOpenCv } from 'opencv-react'
import './MyComponent.css'
// import JWPlayer from '@jwplayer/jwplayer-react'

const MyComponent = () => {
  const data = useOpenCv()
  const { loaded, cv } = useOpenCv()
  const [videoStatus, setVideoStatus] = useState(null)
  const [grayScale, setGrayScale] = useState(true)
  const [src, setSrc] = useState(null)
  const [dst, setDst] = useState(null)

  const onVideoChange = (e) => {
    console.log('e >> ', e.target.files[0])
    if (e.target.files[0]) {
      let videoElement = document.getElementById('videoInput')
      videoElement.src = URL.createObjectURL(e.target.files[0])
      setVideoStatus(videoElement)
    }
  }

  const onGrayScaleChange = () => {
    setGrayScale(!grayScale)
    if (grayScale) {
      let video = document.getElementById('videoInput')
      let src = new cv.Mat(video.height, video.width, cv.CV_8UC4)
      let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1)
      let cap = new cv.VideoCapture(video)
      const FPS = 30

      function processVideo() {
        let begin = Date.now()
        cap.read(src)
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY)
        cv.imshow('canvasOutput', dst)
        // schedule next one.
        let delay = 1000 / FPS - (Date.now() - begin)
        setTimeout(processVideo, delay)
      }
      // schedule first one.
      setTimeout(processVideo, 0)
    }
  }

  if (loaded) {
    return (
      <>
        <div className='process-container'>
          <div className='tile'>
            <div className='process-checkbox'>
              Apply Grayscale
              <input
                type='checkbox'
                id='RGB2Gray'
                name='RGB2Gray'
                value='Grayscale Conversion'
                onChange={onGrayScaleChange}
              />
            </div>
            <div className='filePath'>
              <input
                type='file'
                id='fileInput'
                name='file'
                onChange={(e) => onVideoChange(e)}
              />
            </div>
          </div>
          <div className='tile'>
            {/* <JWPlayer
              file='https://videos-fms.jwpsrv.com/0_62fdb459_0xeca2a7a6df429546000e5027c13e702278f89aa9/content/conversions/k2M5E7f8/videos/CXz339Xh-17199156.mp4'
              library='https://content-portal.jwplatform.com/libraries/MgYBn7ND.js'
            /> */}
            <video
              id='videoInput'
              crossorigin='anonymous'
              src='https://videos-fms.jwpsrv.com/0_62fdb459_0xeca2a7a6df429546000e5027c13e702278f89aa9/content/conversions/k2M5E7f8/videos/CXz339Xh-17199156.mp4'
              width='320'
              height='240'
              controls
            />
            <div className='caption'>Input Image</div>
          </div>
          <div className='tile'>
            <canvas id='canvasOutput'></canvas>
            {/* <JWPlayer
              file='https://videos-fms.jwpsrv.com/0_62fdb459_0xeca2a7a6df429546000e5027c13e702278f89aa9/content/conversions/k2M5E7f8/videos/CXz339Xh-17199156.mp4'
              library='https://content-portal.jwplatform.com/libraries/MgYBn7ND.js'
            /> */}
            <div className='caption'>Output Image</div>
          </div>
        </div>
      </>
    )
  } else {
    return <p>Loading ...</p>
  }
}

export default MyComponent
