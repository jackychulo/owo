import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Home.css'

import * as searchSlice from '../redux/searchSlice'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    //console.log(process.env.REACT_APP_CAT_API);
    const [coverimg, setCoverimg] = useState(null);
    //const [searchinput, setSearchinput] = useState('');

    const searchInput = useSelector(state => state.search.search)
    const scrollDown = useSelector(state => state.search.scrollDown)
    const dispatch = useDispatch()

    //react router
    let navigate = useNavigate()

    //get home cover img
    useEffect(() => {
        return () => {
            fetch('https://api.thecatapi.com/v1/images/search?mime_types=gif&size=full', {
                method: "GET",
                headers: {
                    'x-api-key': process.env.REACT_APP_CAT_API
                },
            })
                .then(res => res.json())
                .then(res => {
                    setCoverimg(res[0].url)
                })
                .catch(err => console.log("fetch cover img error: " + err))
        }
    }, [])

    //submit search
    const searchSubmit = (e) => {
        e.preventDefault()
        if (searchInput !== '') {
            dispatch(searchSlice.submitSearch())
            dispatch(searchSlice.fetchCatsByTags({q: searchInput}))
            navigate("../search")
        }
    }

    //handle search input
    const setSearchInput = (newInput) => {
        dispatch(searchSlice.updateSearch(newInput))
    }

    return (
        <div className='Home'>
            <div /* className={scrollDown ? 'scrollDown' : ''} */>
                <div className="bgimgs">
                    <img src={coverimg} alt='' />
                    <div className="intro">
                        <h1>OwO</h1>
                        <p>Search Cats</p>
                        <form onSubmit={searchSubmit}>
                            <input type="text"
                                value={searchInput}
                                placeholder='Breed, Tag'
                                onChange={e => setSearchInput(e.target.value)} />
                            <input type="submit" value="Search" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home