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
            gap: '8px'
        },
        description: {
            color: '#bdc1c6',
        },
        title: {
            fontSize: '22px',
            color: '#bdc1c6',
            fontWeight: 'bold',

        },
        link: {
            textDecoration: 'none',
            color: '#8ab4f8'
        },
        img: {
            maxWidth: '300px',
        }
    }

    const breeds = useSelector(state => state.search.breeds)
    const status = useSelector(state => state.search.breedsStatus)
    const userInput = useSelector(state => state.search.search)

    if (breeds[0] && breeds[0]?.id !== '') {
        return (
            <div style={style.breeds}>
                <div style={style.container} className='container'>
                    <div style={style.description}>
                        <h3 style={style.title}>Breed</h3>

                        <h4>{breeds[0].name}</h4>

                        <p>{breeds[0].description}</p>
                        <p>Life Span: {breeds[0].life_span}</p>
                        <p>Temperament: {breeds[0].temperament}</p>
                        <p>
                            More Resources: &nbsp;
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