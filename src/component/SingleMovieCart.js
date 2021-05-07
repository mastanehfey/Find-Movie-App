import React ,{useContext} from 'react'
import {mainContext} from '../Context'
import{Link} from 'react-router-dom'
import placeholder from '../images/placeholder.jpg'

export default function SingleMovieCart({movie}) {
    const context = useContext(mainContext)
    const {getSingleMovie} = context
    const overview = movie.overview.slice(0,150)
    const imgPrefix = 'https://image.tmdb.org/t/p/w500/'
    const imagesrc = movie.poster_path !== null ? `${imgPrefix}${movie.poster_path}` : placeholder
    //getSingleMovie in context will find single movie with th epassing ID
    const getSingleMoviee = (id) =>{
        getSingleMovie(id)
    }
    return (
        <div className="single-cart-container">
            <div className="cart-image-wrapper">
                <figure>
                    <img src={imagesrc} alt={movie.title}/>
                </figure>
            </div>
            <div className="cart-content-wrapper">
                <h4 className="cart-title">{movie.title}</h4>
                <p className="cart-date">{movie.release_date}</p>
                {/* progress-bg is 200 px - (vote_average*200)/10 will b epercentage of 200px*/}
                <div className="progress-bg" id={movie.id}>
                    <div className="progress-color" style={{width: `${movie.vote_average*200/10}px`}}>{movie.vote_average*10}%</div>
                </div>
                <p className="cart-overview">{overview} ...</p>
                <Link to={`detail/${movie.id}`}className="more-info" onClick={()=> getSingleMoviee(movie.id)}>
                    More info...
                </Link>
            </div>
        </div>
    )
}
