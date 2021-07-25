import React from 'react'
import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

const Search = ({ handleSearch }) => {

  return (
    <div className='d-flex'>
      <h1 className='me-5'>Search Box:</h1>
      <InputGroup className='w-25'>
        <FormControl
          placeholder="Search"
          onChange={handleSearch}
        />
      </InputGroup>
    </div>
  )
}

export default Search
