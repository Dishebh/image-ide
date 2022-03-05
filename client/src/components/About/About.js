import React from 'react';
import './About.css';
import Team from './Team';

function About() {
  return (
    <div className='about-container'>
      <h1>About Image-IDE</h1>
      <p>
        Image-IDE functions as a multi-utility web application depending on the
        motivation of the user. With this web application, you can write, edit,
        and compile code with just one image. Images with embedded code can be
        uploaded and compiled. It can also be used as a development environment
        for a variety of purposes.
      </p>

      <h1>Team Members</h1>
      <Team />

      <h1 style={{ marginTop: '25px' }}>Team Supervisor</h1>
      <p>
        Dr. Gargi Khanna (Associate Professor, Department of Electronics and
        Communication Engineering)
      </p>
    </div>
  );
}

export default About;
