import React, { useState } from 'react';
import './App.css';
import data from './users.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/index';
import OrderBy from './components/OrderBy/index'
import Page from './components/Pagination/index';
import TableUsers from './components/Table/index'


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
      <OrderBy sortBy={sortBy} value={value} />
      <TableUsers currentUsers={currentUsers} formatDate={formatDate} formatPhone={formatPhone} />
      <Page usersPage={usersPage} total={users.length} paginate={paginate} prevPage={prevPage} nextPage={nextPage} />
    </div>
  );
}

export default App;
