import React from 'react'
import { OpenCvProvider } from 'opencv-react'
import MyComponent from './components/MyComponent';

const App = () => {
  const onLoaded = (cv) => {
    console.log('opencv loaded, cv')
  }

  return (
    <OpenCvProvider onLoad={onLoaded} openCvPath='/opencv/opencv.js'>
      <MyComponent />
    </OpenCvProvider>
  )
}

export default App
