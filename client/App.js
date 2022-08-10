import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Swapi from './Swapi';

const peopleUrl ='https://swapi.dev/api/people'
const planetsUrl = 'https://swapi.dev/api/planets'

//App consists of one feed
class App extends Component {
  render() {
    return (
      <div>
        <Swapi peopleUrl={peopleUrl} planetsUrl={planetsUrl} />
      </div>
    );
  }
}



// Render an <App> component to the #app div in the body
ReactDOM.render(<App />, document.getElementById('app'));
