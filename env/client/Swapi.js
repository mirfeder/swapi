import React, { Component } from 'react';


class Swapi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      people: [],
      planetUrls: [],
      planets: [],
      planetsData: [],
      filter: ''
    };
 
    this.planetsUrl = '/api/planets'
    this.allPeopleUrl = '/api/all'
    this.fetchplanets = this.fetchplanets.bind(this)
    this.filterByPlanet = this.filterByPlanet.bind(this)
    this.fetchall = this.fetchall.bind(this)
  }
  
  fetchall = async () => {
    let url = this.allPeopleUrl
    let result = await fetch(url)
    result = await result.json()
    return result
  }
  
  fetchplanets = async () => {
    let url = this.planetsUrl
    let result = await fetch(url)
    result = await result.json()
    return result
  }

  filterByPlanet = async (e) => {
    const people = this.state.people.filter(el => el['homeworld'] == e.target.value)
    this.setState({planetUrls: people, filter: e.target.value})
  }

  componentDidMount = async () => {

    let data = await this.fetchall()
    const planets = await this.fetchplanets()
   
    this.setState({people: data, planetUrls: data})
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