import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import NotFound from './components/NotFound.js';
import Nav from './components/Nav.js';
import Dashboard from './components/Dashboard.js';
import ItemPage from './components/ItemPage.js';
import ItemList from './components/ItemList.js';
import ChatRoom from './components/ChatRoom.js';

class App extends Component {
  render() {
    return (
      <div>
          <Nav />
          <Switch>
              <Route exact path="/" component={ItemList}/>
              <Route path="/dashboard" component={Dashboard}/>
              {/* /listing/?id=N* for individual item page */}
              <Route path="/listing" component={ItemPage}/>
              <Route path="/ChatRoom" component={ChatRoom}/>
              <Route path="*" component={NotFound} />
          </Switch>
      </div>
    );
  }
}

export default App;
