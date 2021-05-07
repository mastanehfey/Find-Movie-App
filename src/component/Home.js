import React ,{useContext}from 'react'
import ReactPaginate from 'react-paginate';
import SingleMovieCart from './SingleMovieCart'
import {mainContext} from '../Context'
import Controls from './Controls'

export default function Home() {
    const context = useContext(mainContext)
    const {movieList, total_pages , updateState} = context
    const movies = movieList.map(movie=>{
        return <SingleMovieCart key={movie.id} movie={movie}/>
    })
    //handleclick on pagination
    const handlePageClick = (e) =>{
        //pass the page number to getNewPage function in context, selected array starts from 0, so I add 1 for accurate page number
        let pageNo = e.selected + 1
        updateState('pageNo' , pageNo)
    }
    return (
        <section className="home-section">
            <Controls />
            <div className="container-h-padding">
                <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={total_pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(e)=> handlePageClick(e)}
                containerClassName={'pagination'}
                activeClassName={'active'}
                />
            </div>
            <div className="container movie-carts-wrapper">
                {movies}
            </div>
        </section>
    )
}
