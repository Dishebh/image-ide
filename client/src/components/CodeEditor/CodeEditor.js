import './CodeEditor.css';
import { Paper } from '@material-ui/core';
import Ide from '../Ide/Ide';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
// import useLocalStorage from '../../hooks/useLocalStorage';

function CodeEditor() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    if (localStorage.getItem('code') !== null) {
      setCode(localStorage.getItem('code'));
    }

    if (localStorage.getItem('language') !== null) {
      setLanguage(localStorage.getItem('language'));
    }
  }, []);

  console.log({ language });

  return (
    <div className='code-editor'>
      <Paper elevation={24}>
        <Ide
          value={code}
          onCodeChange={setCode}
          codeLanguage={language}
          onLanguageChange={setLanguage}
        />
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  text: state.text.text,
  language: state.text.language,
});

export default connect(mapStateToProps, {})(CodeEditor);
