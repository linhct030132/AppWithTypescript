import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

const OderBy = ({ options, handleSort }: any) => {

  return (
    <Navbar>
      <h1 className='me-4'>OrderBy: </h1>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map((item: any) => {
            return <Dropdown.Item
              key={item.key}
              onClick={handleSort}
            >{item.text}</Dropdown.Item>
          })}
        </Dropdown.Menu>
      </Dropdown>

    </Navbar>
  )
}

export default OderBy
