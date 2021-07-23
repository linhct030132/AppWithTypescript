import React from 'react'
import Table from 'react-bootstrap/Table';


const TableUsers = ({ currentUsers, formatDate, formatPhone }: any) => {
  return (
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
        {currentUsers.map((user: any, index: number) => {
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
  )
}

export default TableUsers
