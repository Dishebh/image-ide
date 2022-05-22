import { Button, Typography } from '@material-ui/core';
import { useCallback, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import './ImageCapture.css';
import { FETCH_TEXT } from '../actions/types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchText } from '../actions';

function ImageCapture({ isTextLoading, fetchText, language }) {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [file, setFile] = useState('');

  const capture = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    setImgSrc(image);
    setFile(image);
    console.log({ image });
    // convertToFileType(image);
  }, [webcamRef, setImgSrc]);

  const videoConstraints = {
    // width: 2900,
    // height: 420,
    facingMode: 'environment',
  };

  async function encodeImageFileAsURL(file) {
    console.log('file gfrom capture', file.split(',')[1]);
    await fetchText(file.split(',')[1]);
    window.open('/editor');
  }

  async function sendImage() {
    dispatch({ type: FETCH_TEXT });
    encodeImageFileAsURL(file);
  }

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isTextLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
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
          disabled={file === '' || language === '' ? true : false}
          variant='contained'
          onClick={sendImage}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isTextLoading: state.text.isTextLoading,
  language: state.text.language,
});

export default connect(mapStateToProps, { fetchText })(ImageCapture);
