import React from 'react'

const MoviesContext = React.createContext({
  moviesSearch: '',
  moviesSearchFun: () => {},
})
export default MoviesContext
