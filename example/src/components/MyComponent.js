import React from 'react'
import { useState } from 'react'
import { useOpenCv } from 'opencv-react'
import './MyComponent.css'

const MyComponent = () => {
  const data = useOpenCv()
  const { loaded, cv } = useOpenCv()
  const [imageStatus, setImageStatus] = useState(null)
  const [grayScale, setGrayScale] = useState(true)
  const [src, setSrc] = useState(null)
  const [dst, setDst] = useState(null)

  const onImageChange = (e) => {
    console.log('e >> ', e.target.files[0])
    if (e.target.files[0]) {
      let imgElement = document.getElementById('imageSrc')
      imgElement.src = URL.createObjectURL(e.target.files[0])
      setImageStatus(imgElement)
    }
  }

  const onGrayScaleChange = () => {
    setGrayScale(!grayScale)
    if (imageStatus){
        if (grayScale) {
            let s = cv.imread(imageStatus)
            let d = new cv.Mat()
            // You can try more different parameters
            setSrc(s)
            setDst(d)
            cv.cvtColor(s, d, cv.COLOR_RGBA2GRAY, 0)
            cv.imshow('canvasOutput', d)
          } else {
            let s = cv.imread(imageStatus);
            cv.imshow('canvasOutput', s);
          }
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
                onChange={(e) => onImageChange(e)}
              />
            </div>
          </div>
          <div className='tile'>
            <img id='imageSrc' alt='No Image' />
            <div className='caption'>Input Image</div>
          </div>
          <div className='tile'>
            <canvas id='canvasOutput'></canvas>
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
