import React from 'react'
import PropTypes from 'prop-types'

function WishItem(props) {
  const baseUrl = 'https://image.tmdb.org/t/p/w200/'
  const { title, overview, poster_path, handleDelete, id } = props
  return (
    <div className='wishItem'>
      <div className='wishItem__image-wrapper'>
        <img
          src={baseUrl + poster_path}
          alt={`Portada de ${title}`}
          className='wishItem__image'
        />
      </div>

      <div className='wishItem__description-wrapper'>
        <h2>{title}</h2>
        <p className='wishItem__description'> {overview}</p>
        <button onClick={() => handleDelete(id)}> Delete </button>
      </div>
    </div>
  )
}
WishItem.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.string,
  id: PropTypes.number,
  handleDelete: PropTypes.func,
}

export default WishItem
