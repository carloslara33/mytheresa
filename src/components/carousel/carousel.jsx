import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CarouselItem from './carouselItem.jsx'

function Carousel(props) {
  const [active, setActive] = useState(0)

  // handle for carousel buttons
  function handleClick(number) {
    setActive(number)
  }
  // returns the items
  function getItems() {
    const items = []
    props.items.forEach((item, index) => {
      let id = `carousel-${props.title}-${index}`
      items.push(
        <CarouselItem
          id={id}
          key={id}
          url={item.poster_path}
          alt={item.original_title}
          name={item.title}
          movieId={item.id}
          category={props.category}
        ></CarouselItem>
      )
    })
    return items
  }

  function getButtons() {
    //the carrousel shows 5 items at the same time
    const carouselDisplayingItems = 5
    //total buttons should be length/ items
    const count = props.items.length / carouselDisplayingItems
    //stores the buttons
    const buttons = []
    for (let index = 0; index < count; index++) {
      let id = `carousel-${props.title}-${index * carouselDisplayingItems}`
      buttons.push(
        <a
          href={`#${id}`}
          onClick={() => handleClick(index)}
          key={`carousel-button-${props.title}-${index}`}
          className={index === active ? 'active' : ''}
        >
          {index + 1}
        </a>
      )
    }
    return buttons
  }

  return (
    <section className='carousel'>
      {props.title && <h2> {props.title}</h2>}
      <div className='carousel__slides'>{getItems()}</div>
      <div className='carousel__buttons'>{getButtons()}</div>
    </section>
  )
}

Carousel.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  category: PropTypes.string,
}

export default Carousel
