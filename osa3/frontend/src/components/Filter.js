import React from 'react'

const Filter = ({ filtered, handleFilter }) => {

  return (
    <div>
        <input
        type="search"
        value={filtered}
        onChange={handleFilter}
        placeholder="search..."
      />
    </div>
  )
}

export default Filter