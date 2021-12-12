import { LinearProgress } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import './Output.css';

function Output({ code, isCodeCompiling }) {
  return (
    <div className='output'>
      {isCodeCompiling && <LinearProgress />}
      <textarea value={code} disabled />
    </div>
  );
}

const mapStateToProps = (state) => ({
  code: state.text.code,
  isCodeCompiling: state.text.isCodeCompiling,
});

export default connect(mapStateToProps, {})(Output);
