import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Ai from 'react-icons/ai'
import { BsChevronDown } from 'react-icons/bs'
import './Breeds.css'

import * as searchSlice from '../redux/searchSlice'

const Breeds = () => {

    const style = {
        breeds: {
            padding: '8px',
            backgroundColor: '#202124',
            paddingBottom: '2rem',
        },
        container: {
            margin: '0 auto',
            maxWidth: '980px',
            display: 'flex',
            gap: '8px',
            paddingTop: '16px'
        },
        breed: {
            padding: '12px 0 12px 0',
            minHeight: '150px'
        },
        description: {
            color: '#bdc1c6',
        },
        title: {
            color: '#bdc1c6',
            fontWeight: 'bold',
            maxWidth: '980px',
            margin: 'auto'
        },
        titleSub: {
            fontSize: '14px',
            fontWeight: 'normal',
            color: '#9aa0a6'
        },
        link: {
            textDecoration: 'none',
            color: '#8ab4f8'
        },
        img: {
            maxWidth: '300px',
        },
        boldt: {
            fontWeight: 'bolder'
        },
        tag: {
            borderRadius: '5px'
        }
    }

    const breeds = useSelector(state => state.search.breeds)
    /* const status = useSelector(state => state.search.breedsStatus)
    const userInput = useSelector(state => state.search.search) */

    const ExtraBreeds = () => {
        const [expandMoreBreeds, setExpandMoreBreeds] = useState(false)
        const dispatch = useDispatch()

        return (
            <div style={{ ...style.description, ...style.container, display: 'block' }}>
                {breeds.slice(1, 3).map((breed, key) => (
                    <div style={style.breed} key={key} >
                        {breed.reference_image_id ?
                            <img
                                style={{ float: 'right', marginLeft: '12px', marginTop: '18px', ...style.img }}
                                src={`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.png`}
                                alt={breed.name}
                                height='150px'
                                onError={(e) => {
                                    e.target.src = `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
                                }}
                            /> :
                            <div style={{ marginLeft: '2rem', color: '#8ab4f8', marginTop: '18px', float: 'right' }}>
                                NO CAT IMAGE <br />
                            </div>
                        }
                        <h4>{breed.name}</h4>
                        <p>{breed.description || <p style={style.titleSub}>No Cat Description</p>}</p>
                        <div>
                            {/* TODO */}
                        </div>
                    </div>
                ))}

                {/* More breeds */}
                <div
                    style={{
                        borderBottom: '1px solid #969ba1', marginTop: '2.5rem',
                        transition: 'height 1s', overflow: 'hidden',
                    }}
                >
                    <h4 style={{
                        margin: '0', display: 'flex', justifyContent: 'space-between',
                    }}
                        onClick={() => setExpandMoreBreeds(!expandMoreBreeds)}
                    >
                        <span>More Breeds</span>
                        <BsChevronDown style={{
                            padding: '8px',
                            transform: expandMoreBreeds ? 'rotate(-3.142rad)' : 'none',
                            transition: 'transform 500ms'
                        }} />
                    </h4>
                    <div style={{
                        flexWrap: 'wrap',
                        gap: '8px', margin: '8px 0 8px 0',
                        display: expandMoreBreeds ? 'flex' : 'none'
                    }}>
                        {breeds.slice(3, breeds.length + 1).map((breed, key) => (
                            <div style={{
                                ...style.tag,
                                backgroundColor: '#303134',
                                borderRadius: '100px',
                                padding: '12px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                display: 'flex',
                            }}
                                key={key}
                                onClick={() => {
                                    console.log(breed.name);
                                    dispatch(searchSlice.updateSearch(breed.name))
                                    dispatch(searchSlice.fetchCatsByBreeds({ q: breed.name }))
                                    dispatch(searchSlice.fetchCatsByTags({ q: breed.name }))
                                }}
                            >
                                <Ai.AiOutlineSearch
                                    size={18}
                                    style={{
                                        height: '100%',
                                        padding: '0 8px 0 0',
                                    }}
                                />
                                {breed.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (!breeds[0]) return <div style={style.breeds}>
        <div style={style.description}>
            <h3 style={style.title}>Cat Breed Not Found</h3>
        </div>
    </div>

    /* if (breeds[0] && breeds[0]?.id !== '') { */
    return (
        breeds[0] && <div style={style.breeds}>
            <div style={style.description}>
                <h3 style={style.title}>Breed &nbsp; <span style={style.titleSub}>Found {breeds.length} breeds</span></h3>
                <div style={style.container} className='container'>
                    <div>
                        <h4>{breeds[0].name}</h4>
                        <p>{breeds[0].description || <p style={style.titleSub}>No Cat Description</p>}</p>
                        <p><span style={style.boldt}>Origin:</span> {breeds[0].origin}</p>
                        <p><span style={style.boldt}>Life Span:</span> {breeds[0].life_span}</p>
                        <p><span style={style.boldt}>Temperament</span>: {breeds[0].temperament}</p>
                        <p>
                            <span style={style.boldt}>Resources:</span> &nbsp;
                            <a style={style.link} href="https://en.wikipedia.org/wiki/Bengal_(cat)">Wikipedia</a>  &emsp;
                            <a style={style.link} href="http://cfa.org/Breeds/BreedsAB/Bengal.aspx">CFA</a> &emsp;
                            <a style={style.link} href="http://www.vetstreet.com/cats/bengal">Vet Street</a> &emsp;
                            <a style={style.link} href="https://vcahospitals.com/know-your-pet/cat-breeds/bengal">VCA Hospitals</a>
                        </p>
                    </div>
                    {breeds[0].reference_image_id ? <img
                        style={style.img}
                        src={`https://cdn2.thecatapi.com/images/${breeds[0].reference_image_id}.png`}
                        alt={breeds[0].name}
                        onError={(e) => {
                            e.target.src = `https://cdn2.thecatapi.com/images/${breeds[0].reference_image_id}.jpg`
                        }}
                    /> :
                        <h1 style={{ marginLeft: '2rem', color: '#8ab4f8' }}>
                            NO CAT IMAGE <br />
                            <span style={style.titleSub}>Go to Resources</span></h1>}

                </div>
            </div>
            {breeds.length > 1 && <ExtraBreeds />}
        </div>
    )
    /* } else if (breeds && status === 'succeeded') {
        return <div style={style.breeds}>
            <div style={style.container}>
                <div style={style.description}>
                    <p style={style.title}>Cat Breed Not Found</p>
                </div>
            </div>
        </div>
    } else {
        return userInput !== '' && <div style={style.breeds}>
            <div style={style.container}>
                <div style={style.description}>
                    <p style={style.title}>Searching Cats o w O</p>
                </div>
            </div>
        </div>
    } */
}

export default Breeds