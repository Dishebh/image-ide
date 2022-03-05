import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import './SelectLanguage.css';
import { SET_LANGUAGE } from '../../actions/types';

const lang_show = [
  'C',
  'C++19',
  'C#',
  'Java',
  'Python3',
  'Ruby',
  'Kotlin',
  'Swift',
];

const lang_store = [
  'c',
  'cpp',
  'csharp',
  'java',
  'python3',
  'ruby',
  'kotlin',
  'swift',
];

function SelectLanguage() {
  const dispatch = useDispatch();
  const [language, setLanguage] = React.useState('');

  const handleChange = (event) => {
    setLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
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
          <MenuItem value={lang_store[0]}>{lang_show[0]}</MenuItem>
          <MenuItem value={lang_store[1]}>{lang_show[1]}</MenuItem>
          <MenuItem value={lang_store[2]}>{lang_show[2]}</MenuItem>
          <MenuItem value={lang_store[3]}>{lang_show[3]}</MenuItem>
          <MenuItem value={lang_store[4]}>{lang_show[4]}</MenuItem>
          <MenuItem value={lang_store[5]}>{lang_show[5]}</MenuItem>
          <MenuItem value={lang_store[6]}>{lang_show[6]}</MenuItem>
          <MenuItem value={lang_store[7]}>{lang_show[7]}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectLanguage;
