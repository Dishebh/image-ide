import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import './SelectLanguage.css';
import { SET_LANGUAGE } from '../../actions/types';

function SelectLanguage() {
  const dispatch = useDispatch();
  const [language, setLanguage] = React.useState('');

  const handleChange = (event) => {
    setLanguage(event.target.value);
    dispatch({ type: SET_LANGUAGE, payload: event.target.value });
  };

  return (
    <Box className='select-language'>
      <FormControl style={{ minWidth: '50%' }}>
        <InputLabel id='demo-simple-select-label'>Language</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={language}
          label='Language'
          onChange={handleChange}
        >
          <MenuItem value={'Javascript'}>Javascript</MenuItem>
          <MenuItem value={'Python'}>Python</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectLanguage;
