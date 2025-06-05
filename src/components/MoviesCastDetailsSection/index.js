import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'

class MoviesCastDetailsSection extends Component {
  state = {movieCastDetails: [], isLoading: true}

  componentDidMount() {
    this.getSingleMoviesCastDetails()
  }

  getSingleMoviesCastDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=93ece72962107beded98f9e7daca0b47&language=en-US`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      const updateCastMovies = data.cast.map(eachItem => ({
        id: eachItem.id,
        profilePath: eachItem.profile_path,
        character: eachItem.character,
        name: eachItem.name,
        castId: eachItem.cast_id,
      }))
      this.setState({movieCastDetails: updateCastMovies, isLoading: false})
    } else {
      console.log('ins')
    }
  }

  render() {
    const {isLoading, movieCastDetails} = this.state
    const imgBase = 'https://image.tmdb.org/t/p/w500'
    return (
      <>
        {isLoading ? (
          <div className="loader">
            <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          <ul className="cast-grid">
            {movieCastDetails.map(member => {
              const {castId, name, character, profilePath} = member
              return (
                <li key={castId} className="cast-card">
                  <img
                    src={
                      profilePath
                        ? imgBase + profilePath
                        : 'https://via.placeholder.com/150'
                    }
                    alt={name}
                    className="cast-image"
                  />
                  <div className="cast-info">
                    <p className="cast-name">{name}</p>
                    <p className="cast-character">{character}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </>
    )
  }
}

export default withRouter(MoviesCastDetailsSection)
