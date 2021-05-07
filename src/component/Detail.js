import React , {useContext} from 'react'
import {Link} from 'react-router-dom'
import {mainContext} from '../Context'
import placeholder from '../images/placeholder.jpg'
import Cast from './Cast'

export default function Detail() {
    const context = useContext(mainContext)
    const {singleMovie} = context
    const {backdrop_path , poster_path, title, overview,credits, genres,vote_average} = singleMovie
    //prefix for image from API
    const imgPrefix = 'https://image.tmdb.org/t/p/w500/'
    const bgsrc = backdrop_path !== null ? `${imgPrefix}${backdrop_path}` : placeholder
    const imagesrc = poster_path !== null ? `${imgPrefix}${poster_path}` : placeholder
    var genreList =''
    if(genres){
        genres.map((genre, index)=>{
            //add , to the list of genres
            if(index === 0){
                return genreList+= `${genre.name}`
            }else{
                return genreList+= `, ${genre.name}`
            }
        })
    }
    const movieCast = credits? credits.cast : []
    return (
        <section className="detail-section">
            <div>
            <div className="container-h-padding">
                <Link to='/' className="backBtn">&#10094;&#10094; GO BACK</Link>
            </div>
                <div className="detail-content-container container">
                    <h2 className="detail-title">{title}</h2>
                    <div className="detial-container">
                        <figure>
                            <img src={imagesrc} alt={title} className="detail-image"/>
                        </figure>
                        <div className="detail-content-wrapper">
                        <div className="progress-bg progress-detail-page">
                            <div className="progress-color" style={{width: `${vote_average*200/10}px`}}>{vote_average*10}%</div>
                        </div>
                            <p className="detail-overview"><b>Overview: </b>{overview}</p>
                            <p><b>Genres: </b>{genreList}</p>
                        </div>
                    </div>                    
                    <Cast cast={movieCast} />
                </div>
            </div>
        </section>
    )
}
