import React , {useContext , useState} from 'react'
import MultiSelect from "react-multi-select-component"
import {mainContext} from '../Context'
import SingleSearchItem from './SingleSearchItem'

export default function Controls() {
    const context = useContext(mainContext)
    const {genres , updateState, searchKeyword,searchResult} = context
    //make a list of years and create options for select year
    var years = []
    for(let i=2021; i>1990; i--){
        years.push(i)
    }
    const yearOptions = years.map((year,index)=>{
        return <option value={year} key={index}>{year}</option>
    })
    //filling multiselect for genres
    const genreList = genres ? 
    genres.map(genre=>{
        return(
            {"label":genre.name , "value":genre.id}
        )
    }) :
    []
    //keep selected genres, year, orderby, sortby in state , selected
    const [selectedGenre , setSelectedGenre] = useState([])
    const handleChange = (key,value)=>{
        updateState(key,value)
    }
    //send the keyword to searchKeyword function in Context
    const handleSearch = (e) =>{
        searchKeyword(e.target.value);
    }

    //create search result list
    var searchItems = ''
    searchItems =
    searchResult ? searchResult.map((movie,index)=>{
        return <SingleSearchItem key={index} movie={movie} searchKeyword={searchKeyword}/>
    }) : ''
    
    return (
        <section className="controls-section">
            <div className="controls-wrapper container">
                <div className="input-group fit-width">
                    <label htmlFor="year">Year</label>
                    <select name="year" className="year-input" onChange={(e)=>{handleChange('year',e.target.value)}}>
                        {yearOptions}
                    </select>
                </div>
                <div className="input-group full-width">
                    <label htmlFor="genre">Genre</label>
                    <MultiSelect
                        name="genre"
                        options={genreList}
                        value={selectedGenre}
                        onChange={(e)=>{setSelectedGenre(e) ; handleChange('selectedGenres',e)}}
                        labelledBy="Select"
                    />
                </div>
                <div className="input-group full-width">
                    <label htmlFor="sortby">SortBy</label>
                    <select name="sortby" onChange={(e)=>{handleChange('sortBy',e.target.value)}}>
                        <option value="popularity.desc">Popularity Descending</option>
                        <option value="popularity.asc">Popularity Ascending</option>
                        <option value="vote_average.desc" >Rating Descending</option>
                        <option value="vote_average.asc">Rating Ascending</option>
                        <option value="Release_Date.desc">Release Date Descending</option>
                        <option value="Release_Date.asc">Release Date Ascending</option>  
                    </select>
                </div>
                <div className="input-group full-width search-wrapper">
                    <label htmlFor="keyword">Keyword</label>
                    <input name="keyword" type="text" onKeyUp={(e)=> handleSearch(e)}/>
                    <div className="search-result-container">
                        {searchItems}
                    </div>
                </div>
            </div>
        </section>
    )
}
