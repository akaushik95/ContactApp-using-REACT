import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactList from './ContactList/ContactList'



class App extends Component {
    addContactAJAX() {
        console.log("clicked");
    }

    render() {

    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3 className="App-title">Contact App using React, Created By: ASHU KAUSHIK (3146481)</h3>

        </header>
        
        <ContactList/>

        
      </div>
    );
  }
}


export default App;
