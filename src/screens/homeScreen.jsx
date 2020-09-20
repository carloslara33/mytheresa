import React, { useEffect, useState } from 'react'
import MovieService from 'services/movieService'
import { Loading, Carousel } from 'components'

function HomeScreen() {
  // initialize states
  const [isLoading, setIsLoading] = useState(true)
  const [playing, setPlaying] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])

  useEffect(() => {
    // get the info from the api
    async function fetchData() {
      // OK, then save to state
      try {
        const promises = await Promise.all([
          MovieService.getNowPlaying(),
          MovieService.getPopular(),
          MovieService.getTopRated(),
        ])
        setPlaying(promises[0].results)
        setPopular(promises[1].results)
        setTopRated(promises[2].results)
      } catch (e) {
        // KO, notify somehow
        console.error(error)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  // Loading
  if (isLoading) {
    return <Loading></Loading>
  }
  // Loaded content
  return (
    <section>
      <Carousel items={playing} title='Playing' category='playing'></Carousel>
      <Carousel items={popular} title='Popular' category='popular'></Carousel>
      <Carousel items={topRated} title='Top Rated' category='rated'></Carousel>
    </section>
  )
}

export default HomeScreen
