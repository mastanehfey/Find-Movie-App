import React from 'react'
import placeholder from '../images/placeholder.jpg'

const imgPrefix = 'https://image.tmdb.org/t/p/w500/'

export default function Cast(cast) {

    const castArray = cast["cast"]
    //sort cast by popularity
    castArray.sort((a,b)=>{
        return b.popularity - a.popularity
    })
    //pick the first 5 popular cast
    const shortCast = castArray.slice(0,6)

    //create list to append to the DOM
    const castList = shortCast.map((person, index)=>{
        const imgSrc = person.profile_path ? `${imgPrefix}${person.profile_path}` : placeholder
        return (
            <div className="cast-wrapper" key={index}>
                <div className="pos-relative">
                    <figure>
                        <img src={imgSrc} alt={person.name} />
                    </figure>
                    <p className="cast-title">{person.name}</p>
                </div>
            </div>
        )
    })
   
    return (
        <section className="cast-section">
            <div className="cast-container">
            {castList}
            </div>
        </section>
    )
}
