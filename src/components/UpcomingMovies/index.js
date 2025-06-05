import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import MoviesContext from '../../MoviesContext'
import Header from '../Header'

import './index.css'

const apiStatusConstant = {
  initail: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UpcomingMovies extends Component {
  state = {
    upcomingMovies: [],
    apiStatus: apiStatusConstant.initail,
  }

  componentDidMount() {
    this.getTopMovies()
  }

  getTopMovies = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const apiUrl =
      'https://api.themoviedb.org/3/movie/upcoming?api_key=93ece72962107beded98f9e7daca0b47&language=en-US&page=1'
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updateMoviesData = data.results.map(eachItem => ({
        id: eachItem.id,
        backdropPath: eachItem.backdrop_path,
        title: eachItem.title,
        posterPath: eachItem.poster_path,
        releaseDate: eachItem.release_date,
        voteAverage: eachItem.vote_average,
      }))
      this.setState({
        upcomingMovies: updateMoviesData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderSuccessView = () => {
    const {upcomingMovies} = this.state
    return (
      <MoviesContext.Consumer>
        {value => {
          const {moviesSearch} = value

          const filterMovies = upcomingMovies.filter(eachItem =>
            eachItem.title.toLowerCase().includes(moviesSearch.toLowerCase()),
          )
          return (
            <ul className="movie-grid-container">
              {filterMovies.map(movie => {
                const {title, posterPath, voteAverage, id} = movie
                return (
                  <li key={id} className="movie-card">
                    <img
                      className="movie-poster"
                      src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                      alt={title}
                    />
                    <h1 className="movie-title">{title}</h1>
                    <p className="movie-rating">⭐ {voteAverage}</p>
                    <Link to={`/movie/${id}`} className="link">
                      <button type="button" className="details-button">
                        View Details
                      </button>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )
        }}
      </MoviesContext.Consumer>
    )
  }

  renderFailureView = () => (
    <div className="loader">
      <h1>Not Found</h1>
    </div>
  )

  renderIsLoading = () => (
    <div className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  )

  renderStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderIsLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderStatus()}
      </>
    )
  }
}

export default UpcomingMovies
