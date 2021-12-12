import React, { useState } from 'react';
import { fetchCode } from '../../actions';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { connect } from 'react-redux';
import './TextEditor.css';

import 'codemirror/mode/jsx/jsx';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import { Button } from '@material-ui/core';

function TextEditor({ text, fetchCode, language }) {
  const mode = language.toLowerCase();

  const options = {
    mode,
    theme: 'material',

    autoCloseBrackets: true,
    cursorScrollMargin: 48,
    // mode: 'jsx',
    lineNumbers: true,
    indentUnit: 2,
    tabSize: 2,
    styleActiveLine: true,
    viewportMargin: 99,
  };

  const [value, setValue] = useState(text);

  const fetchOutput = async () => {
    await fetchCode(value, language);
  };

  return (
    <div className='text-editor' id='text-editor'>
      <CodeMirror
        value={value}
        options={options}
        onBeforeChange={(editor, data, value) => {
          setValue(value);
        }}
        onChange={(editor, data, value) => {
          setValue(value);
        }}
      />
      <div className='submit-btn'>
        <Button color='primary' variant='contained' onClick={fetchOutput}>
          Compile Code
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  text: state.text.text,
  language: state.text.language,
});

export default connect(mapStateToProps, { fetchCode })(TextEditor);
