import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import './App.css';
import EmailBoxComponent from './components/EmailBoxComponent/index'
import Contacts from './components/Contacts/index'
import Preferences from './components/Preferences/index'
import EmailDetailComponent from './components/EmailDetailComponent';
import data from './components/messages.json'

const App: React.FC = () => {

  const [messages, setMessages] = useState(data);
  const [users, setUsers] = useState('')

  const getUser = () => {
    const users = data.map((item) => item.to);
    const usersSet = [...Array.from(new Set(users))];
    return usersSet
  }

  const handleSelectUser = (value: string) => {
    setUsers(value)
  }

  return (
    <Router>
      <div className="container">
        <div className="d-flex justify-content-between">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/messages">
                Message
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/contacts">
                Contacts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName="active" className="nav-link" to="/preferences">
                Preferences
              </NavLink>
            </li>
          </ul>
          <select className="select-user" id="exampleFormControlSelect1" onChange={(event: any) => handleSelectUser(event.target.value)}>
            <option>Choose User</option>
            {getUser().map((user, index) => <option key={index} value={user}>{user}</option>)}
          </select>
        </div>

        <Switch>
          <Redirect exact from="/" to="/messages" />
          <Route path="/messages" render={() => <EmailBoxComponent users={users} />} />
          <Route path="/contacts" component={Contacts}>
          </Route>
          <Route path="/preferences" component={Preferences} />
        </Switch>
        <Route path="/messages/:folder/:id" component={EmailDetailComponent} />
      </div>
    </Router>
  );
}

export default App;
