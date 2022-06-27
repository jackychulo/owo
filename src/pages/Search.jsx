import React from 'react'
import Nav from '../components/Nav'
import CatList from '../components/CatList'
import Breeds from '../components/Breeds'
import { Outlet } from 'react-router-dom'
import "./Search.css"

const Search = () => {
    return (
        <div className='Search'>
            <Nav/>

            <Breeds />
            <CatList />

            <Outlet/>
        </div>
    )
}

export default Search