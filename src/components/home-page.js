import React from 'react';
import { Link } from 'react-router-dom';
import Tasks from './tasks';
import Form, { Wrapper } from './form';

const HomePage = () => {
  return (
    <Wrapper>
      <Link to="/login/">Login</Link>

      <Form />

      <Tasks />
    </Wrapper>
  );
};

export default HomePage;
