import React, { Component , createContext} from 'react'
import genres from './genres.json'

const mainContext = createContext()
const key = process.env.REACT_APP_MOVIE_API_KEY

class ContextProvider extends Component {
    
    constructor(){
        super()
        this.state={
            movieList:[],
            singleMovie:{},
            filteredList:[],
            total_pages:1,
            pageNo:1,
            year:2021,
            selectedGenres:"",
            sortBy:"popularity.desc",
            searchResult:[]
        }
    }
    componentDidMount(){
        this.getData()        
        //if user refresh the detail page, singleMovie will get fetched and state get updated
        const pathname = window.location.pathname
        if(pathname.includes('detail')){
            let id = pathname.slice(8, pathname.length)
            this.getSingleMovie(id)
        }
    }    
    //fetch data from API
    getData = (year = 2021,sortBy = "popularity.desc" , selectedGenres = '', pageNo = 1) =>{
        var url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=${pageNo}&include_adult=false&sort_by=${sortBy}&primary_release_year=${year}&with_genres=${selectedGenres}`
        fetch(url)
        .then(response=>{
            if(!response.ok){
                throw new Error(response.status)
            }
            return response.json()
        })
        .then(data=> this.formatData(data))
        .catch(error=> console.error('error occurd: ', error))
    }
    //format Data fetched from getData    
    //get all genres from json file and update state
    formatData = (data)=>{
        this.setState({
            movieList: data.results,
            filteredList:data.results,
            genres:genres.genres, 
            total_pages: data.total_pages,
            searchResult:[]
        })
    }
    //get clicked movie and update state to show ditail of th emovie in detail page
    getSingleMovie = (id) =>{
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US&append_to_response=credits`
        fetch(url)
        .then(response=>{
            if(!response.ok){
                throw new Error(response.status)
            }
            return response.json()
        })
        .then(data=> {
            this.setState({
                singleMovie : data
            })
        })
        .catch(error=> console.error('error occurd: ', error))
        }
    //update state for sorting and filtering
    updateState=(key,value)=>{
        if(key === 'selectedGenres'){
            //format genre
            let genreString =''
            value.map((genre, index)=>{
                if(index === 0){
                    genreString += `${genre.value}`
                }
                //list is comma seperated, add , after each genre
                else{
                    genreString += `, ${genre.value}`
                }
                return genreString
            })
            value = genreString
        }
        this.setState({
            [key]:value
        })
        //getUrl calls depends on which filter used in controls component
        if(key === 'year'){
            this.getData(value , this.state.sortBy, this.state.selectedGenres,this.state.pageNo)
        }
        else if(key === 'sortBy'){
            this.getData(this.state.year,value,this.state.selectedGenres,this.state.pageNo)
        }
        else if(key === 'selectedGenres'){
            this.getData(this.state.year,this.state.sortBy,value,this.state.pageNo)
        }
        else if(key === 'pageNo'){
            this.getData(this.state.year,this.state.sortBy,this.state.selectedGenres,value)
        }
    }
    //get the keyword searched from Controls component and fetch new search
    searchKeyword = (keyword)=>{
        if(keyword === ''){
            this.setState({searchResult : []})
        }else{
            var url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&page=1&query=${keyword}`
            fetch(url)
            .then(response=>{
                if(!response.ok){
                    throw new Error(response.status)
                }
                return response.json()
            })
            .then(data=> this.setState({
                searchResult : data.results
            }))
            .catch(error=> console.error('error occurd: ', error))
        }
    }
    render() {
        return (
            <mainContext.Provider value={{...this.state,
            getSingleMovie: this.getSingleMovie,
            updateState:this.updateState,
            searchKeyword:this.searchKeyword}}>
                {this.props.children}
            </mainContext.Provider>
        )
    }
}
export {ContextProvider, mainContext}
