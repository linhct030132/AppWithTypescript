import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./users.json";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/index";
import OrderBy from "./components/OrderBy/index";
import Page from "./components/Pagination/index";
import TableUsers from "./components/Table/index";
import Search from "./components/Search/index";

const App = () => {
  
  const options = [
    { key: 1, text: "Id", value: "id" },
    { key: 2, text: "First Name", value: "firstName" },
    { key: 3, text: "Last Name", value: "lastName" },
    { key: 4, text: "Birthday", value: "birthday" },
    { key: 5, text: "Salary", value: "salary" },
    { key: 6, text: "Phone", value: "phone" },
  ];

  const [users, setUsers] = useState(data);
  const [original, setOriginal] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPage, setUsersPage] = useState(10);

  useEffect(() => {
    setOriginal(data)
  }, []);


  const indexOfLastUser = currentPage * usersPage;
  const indexOfFirstUser = indexOfLastUser - usersPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)


  const formatDate = (date: any) => {
    return new Date(date);
  };

  const formatPhone = (phones: any) => {
    let phoneFormat = phones.split("-");
    return `(+84)${phoneFormat.join("")}`;
  };

  const handleSearch = (e: any) => {
    let searchInput = e.target.value;
    let filteredData = original.filter((value) => {
      return (
        value.id.toString().includes(searchInput)||
        value.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.email.toLocaleLowerCase().includes(searchInput.toLowerCase()) ||
        value.gender.toLocaleLowerCase().includes(searchInput.toLowerCase()) ||
        formatDate(value.birthday).toLocaleDateString('vn-VN').includes(searchInput) ||
        value.salary.toString().includes(searchInput) ||
        value.phone.includes(searchInput)
      );
    });
    setUsers([...filteredData]);
  };

  function fieldSorter(fields: any) {
    return function (a: any, b: any) {
        return fields
            .map(function (o: any) {
                var dir = 1;
                if (o[0] === '-') {
                   dir = -1;
                   o=o.substring(1);
                }
                if (a[o] > b[o]) return dir;
                if (a[o] < b[o]) return -(dir);
                return 0;
            })
            .reduce(function firstNonZeroValue (p: any,n: any) {
                return p ? p : n;
            }, 0);
    };
}

  const handleSort = (field: any) => {
    const orderedNewOptions = users.sort(fieldSorter([field]));
    setUsers([...orderedNewOptions])
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < 10) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginate = (number: number) => {
    setCurrentPage(number);
  };


  return (
    <div className="App">
      <Header />
      <OrderBy options={options} handleSort={handleSort} users={users} />
      <Search
        handleSearch={handleSearch}
      />
      <TableUsers
        usersData={currentUsers}
        formatDate={formatDate}
        formatPhone={formatPhone}
      />
      <Page
        usersPage={usersPage}
        total={users.length}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
