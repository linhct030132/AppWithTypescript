import React from 'react'
import { Form } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

const OderBy = ({ sortBy, value }) => {
  return (
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
  )
}

export default OderBy
