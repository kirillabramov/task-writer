import React from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Wrapper } from './form';
import Login from './login';
import Edit from './edit';
import HomePage from './home-page';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route
          path="/login/"
          render={() => {
            return <Login />;
          }}
        />
        <Route
          path="/edit/:id"
          render={({ match }) => {
            const { id } = match.params;
            console.log(match);
            return <Edit id={id} />;
          }}
          exact
        />
        <Route
          render={() => {
            return (
              <PageNotFound>
                <PageNotFoundTitle>Page not found</PageNotFoundTitle>
                <HomeButton to="/">Home</HomeButton>
              </PageNotFound>
            );
          }}
        />
      </Switch>
    </div>
  );
};

export default withRouter(App);

const PageNotFound = styled(Wrapper)`
  text-align: center;
`;
const PageNotFoundTitle = styled.h2`
  color: #000;
  text-align: center;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 3px;
  color: #000;
  transition: 0.25s ease;
  &:hover {
    color: #000;
    text-decoration: none;
    transform: scale(0.95);
    transition: 0.25s ease;
  }
  &:active {
    transform: scale(0.9);
    transition: 0.25s ease;
  }
`;
