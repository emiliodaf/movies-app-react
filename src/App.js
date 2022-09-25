import React from 'react';
import Movie from './components/Movie';
import { useEffect, useState } from 'react';
import { Featured_API, SEARCH_API} from './config/Key';


function App() {

  const [movies, setMovies ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() =>{
      fetch(Featured_API)
      .then(response => response.json())
      .then(data => setMovies(data.results))

  },[])


   const handleOnsubmit = (e) => {
         e.preventDefault()

      if(searchTerm)   {

        fetch(`https://api.themoviedb.org/3/search/movie?&api_key=${SEARCH_API}&query=${searchTerm}`)
        .then(response => response.json())
        .then(data => setMovies(data.results))

        setSearchTerm('');
      }

   };

   const handleOnchange = (e) => {
         setSearchTerm(e.target.value)
   }
  
  return (
     <>
    <header>
      <form onSubmit={handleOnsubmit}>  
      <input className='search' 
      type="search" 
      placeholder='search...'
      value={searchTerm}
      onChange={handleOnchange}></input>
      </form> 
   </header> 
    <div className='movie-container'>
      { 
        movies.map(movie => (
        <Movie key={movie.id} {...movie} />
      ))}
    </div>
    </>

  )
}

export default App;
