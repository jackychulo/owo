import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as Ai from 'react-icons/ai'
import './CatList.css'

const CatList = () => {

    const cats = useSelector(state => state.search.images)
    const [pages, setPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentCats, setCurrentCats] = useState([])

    const imgsPerPage = 15

    useEffect(() => {
        setPages(Math.ceil(cats.length / imgsPerPage))
        setCurrentPage(1)
    }, [cats])

    useEffect(() => {

        const startIndex = currentPage === 1 ? currentPage - 1 : currentPage * 1

        setCurrentCats(cats.slice(
            startIndex,
            startIndex + imgsPerPage
        ))
    }, [cats, currentPage])

    console.log("currentCats size: ", currentCats);

    return (
        <div className='CatList'>
            <ul className='cats'>
                {currentCats && currentCats.map(cat => (
                    <li key={cat.id}>
                        <img src={`https://cataas.com/cat/${cat.id}`} alt="cat" />
                        <div className="tags">
                            {cat.tags.map((tag, key) =>
                                <div key={key} className="tag"><Ai.AiFillTag/>{tag}</div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <div className="pages">
                {pages? <h1>\ OwO /</h1> : null}
                {[...Array(pages)].map((e, i) => (
                    <button
                        key={i}
                        style={(i + 1 === currentPage ? { color: '#8ab4f8' } : {})}
                        onClick={() => setCurrentPage(i + 1)}
                    >{i + 1}</button>
                ))}
            </div>
        </div>
    )
}

export default CatList