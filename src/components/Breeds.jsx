import React from 'react'
import { useSelector } from 'react-redux'
import './Breeds.css'

const Breeds = () => {

    const style = {
        breeds: {
            padding: '8px',
            backgroundColor: '#202124',
            paddingBottom: '2rem'
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
            border: '2px solid red',
            borderRadius: '5px'
        }
    }

    const breeds = useSelector(state => state.search.breeds)
    /* const status = useSelector(state => state.search.breedsStatus)
    const userInput = useSelector(state => state.search.search) */

    const ExtraBreeds = () => (
        <div style={{ ...style.description, ...style.container, display: 'block' }}>
            {breeds.slice(1, 3).map((breed, key) => (
                <div style={style.breed} key={key} >
                    <img
                        style={{ float: 'right', marginLeft: '12px', marginTop: '18px' }}
                        src={`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.png`}
                        alt={breeds.name}
                        height='120px'
                        onError={(e) => {
                            e.target.src = `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
                            console.clear()
                        }}
                    />
                    <h3>{breed.name}</h3>
                    <p>{breed.description}</p>
                </div>
            ))}
            <div style={{
                height: '30px', border: '2px solid red',
                transition: 'height 2s ease-in-out', overflow: 'hidden'
            }}>
                <h3 style={{ margin: '0' }}>More Breeds</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {breeds.slice(3, breeds.length + 1).map((breed, key) => (
                        <div style={style.tag} key={key}>
                            {breed.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

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
                        <p>{breeds[0].description}</p>
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
                    <img
                        style={style.img}
                        src={`https://cdn2.thecatapi.com/images/${breeds[0].reference_image_id}.png`}
                        alt={breeds[0].name}
                        onError={(e) => {
                            e.target.src = `https://cdn2.thecatapi.com/images/${breeds[0].reference_image_id}.jpg`
                        }}
                    />
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