import React from 'react'
import {Link} from 'react-router-dom'
import placeholder from '../images/placeholder.jpg'

export default function SingleSearchItem({movie, searchKeyword}) {
    const imgPrefix = 'https://image.tmdb.org/t/p/w500/'
    const imagesrc = movie.poster_path !== null ? `${imgPrefix}${movie.poster_path}` : placeholder
    return (
        <Link className="search-item-container" to={`detail/${movie.id}`} onClick={()=> searchKeyword('')}>
            <div className="search-image">
                <img src={imagesrc} alt={movie.title} />
            </div>
            <div className="search-item-title">
                <h4>{movie.title}</h4>
            </div>
        </Link>
    )
}
