import { Button, Typography } from '@material-ui/core';
import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './ImageCapture.css';

function ImageCapture() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    setImgSrc(image);
  }, [webcamRef, setImgSrc]);

  const videoConstraints = {
    // width: 2900,
    // height: 420,
    facingMode: 'environment',
  };

  return (
    <div>
      <div className='button-container'>
        <Button
          color='primary'
          variant='contained'
          onClick={imgSrc === null ? capture : () => setImgSrc(null)}
          className='capture-button'
        >
          {imgSrc === null ? 'Capture Image' : 'Take another image'}
        </Button>
        <Button
          disabled={imgSrc === null ? true : false}
          variant='contained'
          color='secondary'
          onClick={() => setImgSrc(null)}
        >
          Remove Image
        </Button>
      </div>
      <Typography variant='h6' align='center'>
        Image Preview
      </Typography>
      <hr style={{ width: '70%' }} />
      {imgSrc === null ? (
        <div className='capture-image'>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            width='100%'
            videoConstraints={videoConstraints}
          />
        </div>
      ) : (
        <></>
      )}
      {imgSrc && <img className='capture-image' src={imgSrc} alt='preview' />}
      <div className='submit-btn'>
        <Button
          colo='primary'
          disabled={imgSrc === null ? true : false}
          variant='contained'
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ImageCapture;
