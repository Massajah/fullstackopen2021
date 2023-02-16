import React from 'react'

const Filter = ({ filtered, handleFilter }) => {

  return (
    <div>
        <input
        className='search'
        type="search"
        value={filtered}
        onChange={handleFilter}
        placeholder="search..."
        />
    </div>
  )
}

export default Filter