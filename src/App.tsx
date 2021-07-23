import React, { useState } from 'react';
import './App.css';
import data from './users.json'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header'
import { Form } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

const App = () => {

  const [users, setUsers] = useState(data)
  const [value, setValue] = useState('');

  const formatDate = (date: any) => {
    return new Date(date)
  }

  const formatPhone = (phones: any) => {
    let phoneFormat = phones.split('-');
    return `(+84)${phoneFormat.join('')}`
  }

  const sortBy = (event: any) => {
    setValue(event.target.value)
    
  }

  return (
    <div className="App">
      <Header />
      <Navbar>
        <h1 className='me-4'>OrderBy: </h1>
        <Form.Control
        as="select"
        className='w-25'
        onChange={sortBy}
        value={value}
        >
          <option  value="Select field to sort">Select field to sort</option>
          <option  value="id">Id</option>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="email">Email</option>
          <option value="birthday">Birthday</option>
          <option value="salary">Salary</option>
        </Form.Control>
      </Navbar>
      <Table striped hover size="md">
        <thead>
          <tr>
            <th>Id</th>
            <th>Fitst Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Birthday</th>
            <th>Salary</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return <tr key={index}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{formatDate(user.birthday).toLocaleDateString('en-US')}</td>
              <td>{user.salary}</td>
              <td>{formatPhone(user.phone)}</td>
            </tr>
          })}
        </tbody>
      </Table>

    </div>
  );
}

export default App;
