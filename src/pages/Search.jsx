import React from 'react'
import Nav from '../components/Nav'
import CatList from '../components/CatList'
import { Outlet } from 'react-router-dom'
import "./Search.css"

const Search = () => {
    return (
        <div className='Search'>
            <Nav/>

            <CatList />

            <Outlet/>
        </div>
    )
}

export default Search