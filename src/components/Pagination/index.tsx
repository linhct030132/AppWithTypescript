import React from 'react'
import Pagination from 'react-bootstrap/Pagination'



const Page = ({ total, usersPage, paginate, prevPage, nextPage, currentPage }: any) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total / usersPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <Pagination className='justify-content-center'>
            <Pagination.Prev onClick={prevPage} />
            {pageNumbers.map((number: number) => {
                return <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)} >{number}</Pagination.Item>
            })}
            <Pagination.Next onClick={nextPage} />
        </Pagination>
    )
}

export default Page
