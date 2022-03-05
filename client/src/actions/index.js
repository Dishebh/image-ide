import axios from 'axios';
import {
  FETCH_ERROR,
  FETCH_TEXT,
  FETCH_TEXT_SUCCESS,
  FETCH_USER,
  FETCH_CODE,
  FETCH_CODE_SUCCESS,
} from './types';

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    // console.log(error);
    dispatch({
      type: FETCH_ERROR,
    });
  }
};

export const fetchText = (image) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TEXT });

    const options = {
      method: 'POST',
      url: 'https://image-ide-vision-api.herokuapp.com/get_code',
      headers: { 'Content-Type': 'application/json' },
      data: {
        input_image: image,
      },
    };

    const res = await axios.request(options);

    localStorage.setItem('code', res.data.Text);
    dispatch({ type: FETCH_TEXT_SUCCESS, payload: res.data.Text });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_ERROR,
    });
  }
};

export const fetchCode = (code, language) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_CODE,
    });

    const options = {
      method: 'POST',
      url: 'https://image-ide-api.herokuapp.com/compile',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      data: [{ language, code }],
    };

    const res = await axios.request(options);

    console.log('res!', res.data);

    dispatch({
      type: FETCH_CODE_SUCCESS,
      payload: res.data.Text,
    });
  } catch (error) {
    console.log('error!', error);
    dispatch({
      type: FETCH_ERROR,
    });
  }
};
