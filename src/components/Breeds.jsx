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
        description: {
            color: '#bdc1c6',
        },
        title: {
            fontSize: '22px',
            color: '#bdc1c6',
            fontWeight: 'bold',
            maxWidth: '980px',
            margin: 'auto'
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
        }
    }

    const breeds = useSelector(state => state.search.breeds)
    const status = useSelector(state => state.search.breedsStatus)
    const userInput = useSelector(state => state.search.search)

    if (breeds[0] && breeds[0]?.id !== '') {
        return (
            <div style={style.breeds}>
                <div style={style.description}>
                    <h3 style={style.title}>Breed</h3>
                    <div style={style.container} className='container'>
                        <div>
                            <h4>{breeds[0].name}</h4>
                            <p>{breeds[0].description}</p>
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
            </div>
        )
    } else if (breeds && status === 'succeeded') {
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
    }
}

export default Breeds