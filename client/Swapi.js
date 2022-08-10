import React, { Component } from 'react';

// Feed contains multiple FeedItems
// Put AJAX in this Component
class Swapi extends Component {

  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      planetUrls: [],
      planets: [],
      planetsData: []
    };
    this.peopleUrl = this.props.peopleUrl;
    this.planetsUrl = this.props.planetsUrl;
    this.fetchdata = this.fetchdata.bind(this)
    this.fetchplanets = this.fetchplanets.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  
   fetchdata = async () => {
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

  handleInputChange = async (e) => {
    const people = this.state.urls.filter(el => el['homeworld'] == e.target.value)
    this.setState({planetUrls: people})
  }

  componentDidMount = async () => {

    const data = await this.fetchdata()
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
    this.state.planetUrls.forEach((rec) => {
      const pname = rec['name']
      const homeworld = rec['homeworld']
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
              <select className='inputText' type='select' name='homeworld' value={'hello'} onChange={(e) => {this.handleInputChange(e)}} >
                <option>Select planet</option>
              {planets}
              </select>
        </div>
        <div  style={styles.container}>
        <table className='table' >
          <thead >
            <tr>
              <td>Name</td>
              <td>Homeworld</td>
            </tr>            
          </thead>
          <tbody >
            {characters}
          </tbody>
        </table>
        </div>
      </div>
    );
  }

}
const styles = {
  container: {
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto',
    gridTemplateAreas: 
    `'header header'
    'body body'`,
    gap: '2px 2px',
    justifyContent: 'center',
    border: '2px',
    borderStyle: 'solid'
  }, 
  inner: {
    border: '1px',
    borderStyle: 'solid',
    minHeight: '15px'
  }
};

export default Swapi;