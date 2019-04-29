import React, { PureComponent } from 'react';
import './App.css';

const usersUrl = 'https://jsonplaceholder.typicode.com/users';

class App extends PureComponent {
  state = {
    query: '',
    users: []
  }

  componentDidMount() {
    fetch(usersUrl).then(response => {
      response.json().then(users => {
        this.setState({
          users
        });
      })
    }).catch(error => {
      alert('Couldn\t retrieve users');
    })
  }

  change = ({ target }) => {
    this.setState({
      query: target.value,
      showSuggestion: true
    });
  }

  chooseSuggestion = (name) => {
    this.setState({
      query: name,
      showSuggestion: false
    });
  }

  render() {
    const { query, users, showSuggestion } = this.state;
    const suggestions = users.filter(eachUser => query && eachUser.name.toLowerCase().includes(query.toLowerCase()));
    return (
      <div className="App">
        <div className="form-wrapper">
          <p>Enter Name:</p>
          <input value={query} onChange={this.change} type="text" name="search" className="search" />
          <div className="suggestions">
            {
              showSuggestion && suggestions.map((each, key) => <p onClick={() => this.chooseSuggestion(each.name)} key={key}>{each.name}</p>)
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
