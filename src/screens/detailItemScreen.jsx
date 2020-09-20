import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MovieService from 'services/movieService'
import { Loading } from 'components'
import { useQueryParams } from 'hooks'
import { useStore } from 'store'
import PropTypes from 'prop-types'

function DetailItemScreen() {
  // initialize states
  const [isLoading, setIsLoading] = useState(true)
  const [details, setDetails] = useState({})
  // get id from url
  const { id } = useParams()
  const baseUrl = process.env.REACT_APP_IMG_URL
  //get query params from url
  const queryparams = useQueryParams()
  const { state, dispatch } = useStore()
  const { overview, title, poster_path, ...rest } = details

  useEffect(() => {
    // get the info from the api
    async function fetchData() {
      // OK, then save to state
      try {
        const details = await MovieService.getDetails(id)
        setDetails(details)
      } catch (e) {
        // KO, notify somehow
        console.error(error)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  function handleClick(id) {
    dispatch({ type: 'add', id })
  }

  // used to disable the wishlist button if this id is already in the list
  function isDisabled(id) {
    return state.wishlist.find((el) => el === id)
  }

  // Loading element
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <section className={`detailScreen ${queryparams.get('category')}`}>
      <img
        src={baseUrl + poster_path}
        alt={`Portada de ${title}`}
        className='detailScreen__image'
      />
      <div className='detailScreen__description-wrapper'>
        <div className='detailScreen__description'>{overview}</div>
        <button onClick={() => handleClick(id)} disabled={isDisabled(id)}>
          Add to whishList
        </button>
      </div>
      <div className='detailScreen__aditionalInfo'>
        <ul>
          {/* remove object and null items */}
          {Object.keys(rest).map((prop) =>
            typeof rest[prop] === 'object' || !!!rest[prop] ? (
              ''
            ) : (
              <li key={prop}>
                <strong>{`${prop}:`}</strong> {rest[prop]}
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  )
}

DetailItemScreen.propTypes = {
  overview: PropTypes.string,
  title: PropTypes.string,
  poster_path: PropTypes.string,
}

export default DetailItemScreen
