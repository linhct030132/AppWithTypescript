import React, { useState } from 'react';
import './App.css';
import data from './users.json'
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header'
import { Form } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import Page from './components/Pagination/index';


const App = () => {

  const options = [
    { key: 1, text: "Id", value: "id" },
    { key: 2, text: "First Name", value: "firstName" },
    { key: 3, text: "Email", value: "email" },
  ];

  const [users, setUsers] = useState(data);
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPage, setUsersPage] = useState(10);

  const indexOfLastUser = currentPage * usersPage;
  const indexOfFirstUser = indexOfLastUser - usersPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  console.log(currentPage);



  const formatDate = (date: any) => {
    return new Date(date)
  }

  const formatPhone = (phones: any) => {
    let phoneFormat = phones.split('-');
    return `(+84)${phoneFormat.join('')}`
  }

  const sortBy = (event: any) => {
    setValue(event.target.value)
    let a = event.target.value
    console.log(a);
  }

  const prevPage = () => {
    if(currentPage>1){
      setCurrentPage(currentPage-1)
    }
  }

  const nextPage = () => {
    if (currentPage < 10) {
      setCurrentPage(currentPage+1)
    }
  }

  const paginate = (number: number) => {
    setCurrentPage(number)
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
          <option>Select field to sort</option>
          <option value="id">Id</option>
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
          {currentUsers.map((user, index) => {
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
      <Page usersPage={usersPage} total={users.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}

export default App;
