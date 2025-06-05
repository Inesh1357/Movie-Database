import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import MoviesContext from '../../MoviesContext'
import './index.css'

class Header extends Component {
  state = {searchQuery: ''}

  handleChange = event => {
    this.setState({searchQuery: event.target.value})
  }

  render() {
    const {searchQuery} = this.state
    const {location} = this.props
    const {pathname} = location
    let popularMovies
    let topMovies
    let upcomingMovies
    if (pathname === '/') {
      popularMovies = 'style'
      upcomingMovies = ''
      topMovies = ''
    } else if (pathname === '/top-rated') {
      popularMovies = ''
      upcomingMovies = ''
      topMovies = 'style'
    } else if (pathname === '/upcoming') {
      popularMovies = ''
      upcomingMovies = 'style'
      topMovies = ''
    }
    return (
      <MoviesContext.Consumer>
        {value => {
          const {moviesSearchFun} = value
          const handleSearch = () => {
            moviesSearchFun(searchQuery)
          }
          return (
            <nav className="navbar">
              <h1 className="navbar-title">movieDB</h1>
              <div className="navbar-links">
                <Link to="/" className={`nav-button ${popularMovies}`}>
                  Popular
                </Link>
                <Link to="/top-rated" className={`nav-button ${topMovies}`}>
                  Top Rated
                </Link>
                <Link to="/upcoming" className={`nav-button ${upcomingMovies}`}>
                  Upcoming
                </Link>
              </div>
              <div className="navbar-search">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={this.handleChange}
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </nav>
          )
        }}
      </MoviesContext.Consumer>
    )
  }
}

export default withRouter(Header)
