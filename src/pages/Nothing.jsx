import React from 'react'
import { useSelector } from 'react-redux'

const Nothing = () => {

  const searchInput = useSelector(state => state.search.search)

  if (searchInput === '') {
    return (
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        <h1>YOU FORGOT SOMETHING, MEOW</h1>
      </div>
    )
  }
}

export default Nothing