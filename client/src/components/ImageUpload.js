import { Button, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchText } from '../actions';
import './ImageUpload.css';
import Tesseract from 'tesseract.js';
import {
  FETCH_ERROR,
  FETCH_TEXT,
  FETCH_TEXT_SUCCESS,
  REMOVE_TEXT,
} from '../actions/types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const ImageThumb = ({ image }) => {
  return (
    <img
      className='upload-image'
      src={URL.createObjectURL(image)}
      alt={image.name}
    />
  );
};

const flaskUrl = 'http://localhost:8000/';
const nodeUrl = 'http://localhost:5000/api/';

function ImageUpload({ fetchText, text, isTextLoading, language }) {
  const dispatch = useDispatch();

  const [file, setFile] = useState('');
  const [encodedImage, setEncodedImage] = useState('');

  function handleUpload(e) {
    console.log('e!!', e.target.files);
    e.target.files.length > 0 && setFile(e.target.files[0]);
  }

  function scrollToEditor() {
    const editor = document.getElementById('text-editor');

    editor.scrollIntoView({ behavior: 'smooth' });
  }

  function encodeImageFileAsURL(file) {
    const reader = new FileReader();
    reader.onloadend = async function () {
      // console.log('RESULT', reader.result);
      setEncodedImage(reader.result.split(',')[1]);
      await fetchText(reader.result.split(',')[1]);
      window.open('/editor');
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setFile('');
    localStorage.removeItem('code');
    localStorage.removeItem('language');
    dispatch({ type: REMOVE_TEXT });
  }

  async function sendImage() {
    dispatch({ type: FETCH_TEXT });

    // const image = URL.createObjectURL(file);

    encodeImageFileAsURL(file);

    // console.log({ encodedImage });

    // await fetchText(encodedImage);
    // window.open('/editor');

    // Tesseract.recognize(image, 'eng', {
    //   // logger: (m) => console.log(m)
    // })
    //   .then(({ data: { text } }) => {
    //     // console.log(text);
    //     localStorage.setItem('code', text);
    //     dispatch({ type: FETCH_TEXT_SUCCESS, payload: text });
    //     // scrollToEditor();
    //     window.open('/editor');
    //   })
    //   .catch((e) => {
    //     dispatch({ type: FETCH_ERROR });
    //   });
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
          className='upload-button'
          variant='contained'
          color='primary'
          component='label'
          onClick={file !== '' ? removeImage : () => {}}
        >
          {file === '' ? 'Upload Image' : 'Upload another image'}
          <input
            hidden
            accept='image/'
            type='file'
            onChange={handleUpload}
            onClick={handleUpload}
          />
        </Button>
        <Button
          disabled={file === '' ? true : false}
          variant='contained'
          color='secondary'
          onClick={removeImage}
        >
          Remove Image
        </Button>
      </div>

      <Typography variant='h6' align='center'>
        Image Preview
      </Typography>
      <hr style={{ width: '70%' }} />

      {file && <ImageThumb image={file} />}
      <div className='submit-btn'>
        <Button
          color='primary'
          disabled={file === '' || language === '' ? true : false}
          variant='contained'
          onClick={sendImage}
        >
          Submit
        </Button>
      </div>
      {
        // text.length > 0 && handleOpenEditor()
        // text.length > 0 && window.open('/editor')
        // <div>
        //   <CodeEditor />
        //   {/* <TextEditor /> */}
        //   {/* <Output /> */}
        // </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
  text: state.text.text,
  isTextLoading: state.text.isTextLoading,
  language: state.text.language,
});

export default connect(mapStateToProps, { fetchText })(ImageUpload);
