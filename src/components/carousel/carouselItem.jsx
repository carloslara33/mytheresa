import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function CarouselItem(props) {
  const baseUrl = process.env.REACT_APP_IMG_URL
  const { id, movieId, category, url, alt, name } = props
  return (
    <div className='carouselItem' id={id}>
      <Link to={`/detail/${movieId}?category=${category}`}>
        <div className='carouselItem__slide'>
          <img src={baseUrl + url} alt={alt} className='carouselItem__image' />
          <h4 className='carouselItem__name'>{name}</h4>
        </div>
      </Link>
    </div>
  )
}

CarouselItem.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  movieId: PropTypes.number,
  category: PropTypes.string,
}

export default CarouselItem
