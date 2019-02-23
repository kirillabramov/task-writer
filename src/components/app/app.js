import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
  }

  somefunc = () => {
    return 1 + 1;
  };

  render() {
    return <div className="App">React Starter</div>;
  }
}

export default App;
