import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import Home from './components/Home'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import MoviesContext from './MoviesContext'
import SingleMoviesDetails from './components/SingleMoviesDetails'
import './App.css'

// write your code here

class App extends Component {
  state = {moviesSearch: ''}

  moviesSearchFun = moviesSearchValue => {
    this.setState({moviesSearch: moviesSearchValue})
  }

  render() {
    const {moviesSearch} = this.state
    return (
      <MoviesContext.Provider
        value={{
          moviesSearch,
          moviesSearchFun: this.moviesSearchFun,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={TopRatedMovies} />
          <Route exact path="/upcoming" component={UpcomingMovies} />
          <Route exact path="/movie/:id" component={SingleMoviesDetails} />
        </Switch>
      </MoviesContext.Provider>
    )
  }
}

export default App
