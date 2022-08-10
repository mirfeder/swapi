import React, { Component } from 'react';


class Swapi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      planetUrls: [],
      planets: [],
      planetsData: [],
      filter: ''
    };
 
    this.peopleUrl = 'https://swapi.dev/api/people'
    this.planetsUrl = 'https://swapi.dev/api/planets'
    this.fetchpeople = this.fetchpeople.bind(this)
    this.fetchplanets = this.fetchplanets.bind(this)
    this.filterByPlanet = this.filterByPlanet.bind(this)
  }
  
   fetchpeople = async () => {
    let result;
    let fullResult = []
    let done = false
    let url = this.peopleUrl
    while (!done) {
      result = await fetch(url)
      result = await result.json()
      fullResult.push(result.results)
      if (result['next'] ) {
            url = result.next
      } else {
            done = true
      }
    }
    fullResult = fullResult.flat()
    return fullResult
  }

  fetchplanets = async () => {
    let result;
    let fullResult = []
    let done = false
    let url = this.planetsUrl
    while (!done) {
      result = await fetch(url)
      result = await result.json()
      fullResult.push(result.results)
      if (result['next'] ) {
            url = result.next
      } else {
            done = true
      }
    }
    fullResult = fullResult.flat()
    return fullResult
  }

  filterByPlanet = async (e) => {
    const people = this.state.urls.filter(el => el['homeworld'] == e.target.value)
    this.setState({planetUrls: people, filter: e.target.value})
  }

  componentDidMount = async () => {

    const data = await this.fetchpeople()
    const planets = await this.fetchplanets()
    for (let person of data) {
      for (let planet of planets) {
        if (person['homeworld'] == planet['url']) {
          person['homeworld'] = planet['name']
          continue
        }
      }
    }
    this.setState({urls: data, planetUrls: data})
    this.setState({planetsData: planets})

    const planetsArray = []
    for (let planet of planets) {
      planetsArray.push(planet['name'])
    }
    this.setState({planets: planetsArray})
  }

  render() {
    const characters = [];
    this.state.planetUrls.forEach((person) => {
      const pname = person['name']
      const homeworld = person['homeworld']
      characters.push(<tr><td>{pname}</td><td>{homeworld}</td></tr> )
    })
    const planets = []
    this.state.planets.forEach((pl) => {
      planets.push(<option>{pl}</option>)
    })

    return (
      <div id='feed'>
        <div >
          <label className='inputLabels'>Filter by Homeworld</label>
              <select className='inputText' type='select' style={styles.select} onChange={(e) => {this.filterByPlanet(e)}} >
                <option>{this.state.filter}</option>
                {planets}
              </select>
        </div>
        <div>
        <table>
          <thead>
            <tr>
              <td style={styles.thead}>Name</td>
              <td style={styles.thead}>Homeworld</td>
            </tr>            
          </thead>
          <tbody style={styles.tbody}>
            {characters}
          </tbody>
        </table>
        </div>
      </div>
    );
  }

}
const styles = {
  thead: {
    backgroundColor: 'lavender',
    width: '200px',
    color: 'black'
  },
  select: {
    margin: '10px'
  },
  tbody: {
    backgroundColor: 'white',
    color: 'black'
  }
};

export default Swapi;