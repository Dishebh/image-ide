import React from 'react';
import './Analytics.css';
import Analytics1 from './analytics1.jpeg';
import Analytics2 from './analytics2.jpeg';
import Analytics3 from './analytics3.jpeg';
import Analytics4 from './analytics4.jpeg';
import Analytics5 from './analytics5.jpeg';

function Analytics() {
  return (
    <div className='analytics-container'>
      <h1>Image-IDE Analytics and Prediction results</h1>
      <div className='analytics-images'>
        <img src={Analytics1} alt='analytics' />
        <img src={Analytics2} alt='analytics' />
        <img src={Analytics3} alt='analytics' />
        <img src={Analytics4} alt='analytics' />
        <img src={Analytics5} alt='analytics' />
      </div>
    </div>
  );
}

export default Analytics;
