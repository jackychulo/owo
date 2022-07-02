import React, { useCallback } from 'react'
import Nav from '../components/Nav'
import CatList from '../components/CatList'
import Breeds from '../components/Breeds'
import { Outlet } from 'react-router-dom'
import "./Search.css"
import { useSelector } from 'react-redux'
import searchSlice from '../redux/searchSlice'
import { render } from 'react-dom'

const Search = () => {
    const activeTag = useSelector(state => state.search.activeTag)

    const renderContent = useCallback(() => {
        switch (activeTag) {
            case 'All':
                return (<>
                    <Breeds />
                    <CatList />
                </>)
            case 'Breed':
                return <Breeds />
            case 'Tag':
                return <CatList />
            default:
                return <h1>Invalid Tag</h1>
        }
    }, [activeTag])

    return (
        <div className='Search'>
            <Nav />

            {renderContent()}

            <Outlet />
        </div>
    )
}

export default Search