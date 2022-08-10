import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swapi from './Swapi';


class App extends Component {
  render() {
    return (
      <div>
        <Swapi />
      </div>
    );
  }
}



// Render an <App> component to the #app div in the body
ReactDOM.render(<App />, document.getElementById('app'));
