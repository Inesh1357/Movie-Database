import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MoviesCastDetailsSection from '../MoviesCastDetailsSection'
import Header from '../Header'

import './index.css'

const apiStatusConstant = {
  initail: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SingleMoviesDetails extends Component {
  state = {
    singleMoviesDetails: [],
    apiStatus: apiStatusConstant.initail,
  }

  componentDidMount() {
    this.getSingleMoviesDetails()
  }

  getSingleMoviesDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=93ece72962107beded98f9e7daca0b47&language=en-US`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const updateMoviesDetails = {
        id: data.id,
        releaseDate: data.release_date,
        rating: data.vote_average,
        duration: data.runtime,
        name: data.title,
        image: data.poster_path,
        overview: data.overview,
        genres: data.genres.map(g => g.name).join(', '),
      }
      this.setState({
        singleMoviesDetails: updateMoviesDetails,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderSuccessView = () => {
    const {singleMoviesDetails} = this.state
    const imgBase = 'https://image.tmdb.org/t/p/w500'
    const {
      releaseDate,
      rating,
      duration,
      name,
      image,
      overview,
      genres,
    } = singleMoviesDetails
    return (
      <div className="movie-details-page">
        <div className="movie-section">
          <img src={imgBase + image} alt={name} className="movie-poster" />
          <div className="movie-info">
            <h1>{name}</h1>
            <p>
              <strong>Rating:</strong> {rating}
            </p>
            <p>
              <strong>Duration:</strong> {duration} mins
            </p>
            <p>
              <strong>Genre:</strong> {genres}
            </p>
            <p>
              <strong>Release Date:</strong> {releaseDate}
            </p>
            <p>
              <strong>Overview:</strong> {overview}
            </p>
          </div>
        </div>
        <h1>Cast</h1>
        <MoviesCastDetailsSection />
      </div>
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

export default SingleMoviesDetails
