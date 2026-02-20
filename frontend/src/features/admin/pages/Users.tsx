import React from 'react'
import Table from '../components/Table';
import UsersFilters from '../components/UsersFilters';
const Users = () => {
  return (
    <div>
      <UsersFilters />
      <Table />
    </div>
  )
}

export default Users