import React from 'react'
import './Nav.css'
import { useDispatch, useSelector } from 'react-redux'

import * as searchSlice from '../redux/searchSlice'
import * as Bs from 'react-icons/bs'
import * as Ai from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Nav = () => {

    const dispatch = useDispatch()
    const searchInput = useSelector(state => state.search.search)
    const activeTag = useSelector(state => state.search.activeTag)
    const navigate = useNavigate()

    const logo = 'OwO';
    const tags = ['All', 'Breed', 'Tag']

    const clickLogo = () => {
        dispatch(searchSlice.resetSearch())
        navigate("..")
    }

    const clickSubmit = (e) => {
        /* dispatch(searchSlice.submitSearch()) */
        e.preventDefault()
        console.log("helo");
        if (searchInput) {
            //or switch in the future
            if (activeTag === 'All') {
                dispatch(searchSlice.fetchCatsByTags({ q: searchInput }))
                dispatch(searchSlice.fetchCatsByBreeds({ q: searchInput }))
            } else if (activeTag === 'Breed') {
                dispatch(searchSlice.fetchCatsByTags({ q: searchInput }))
            } else {
                dispatch(searchSlice.fetchCatsByBreeds({ q: searchInput }))
            }
        }
    }

    return (
        <div className='Nav'>
            <div className="navbar">
                <h2 onClick={clickLogo}>{logo}</h2>
                <div className="searchbar">
                    <form onSubmit={e => clickSubmit(e)}>
                        <input type="text"
                            value={searchInput}
                            onChange={e => dispatch(searchSlice.updateSearch(e.target.value))} />
                    </form>
                    {searchInput && <button
                        className='firstbtn' 
                        onClick={() => dispatch(searchSlice.emptySearch())}><Ai.AiOutlineClose className='searchReset' /></button>}
                    <button className='searchbtn' onClick={clickSubmit}><Bs.BsSearch className='searchIcon' /></button>
                </div>
            </div>
            <div className="tags">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className={activeTag === tag ? 'activeTag' : ''}
                        onClick={() => dispatch(searchSlice.updateTag(tag))}
                    >
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Nav