import React, { useEffect, useState } from 'react'
import MovieService from 'services/movieService'
import { Loading, WishItem } from 'components'
import { useStore } from 'store'

function WishlistScreen() {
   // initialize states
  const [isLoading, setIsLoading] = useState(true)
  const [details, setDetails] = useState([])
  // get store
  const { state, dispatch } = useStore()

  useEffect(() => {
    // get the info from the api
    async function fetchData() {
      const promises = state.wishlist.map((id) => MovieService.getDetails(id))
      // OK, then save to state
      try {
        const details = await Promise.all(promises)
        setDetails(details)
      } catch (e) {
        // KO, notify somehow
        console.error(error)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  function handleDelete(id) {
    //removed from the store
    dispatch({ type: 'delete', id })
    //removed from the view, I make it so in order to remove unnecesary requests
    // if I put state.wishlist to the useEffect it works but make requests
    const newDetails = details.filter((detail) => detail.id !== id)
    setDetails(newDetails)
  }

  // the is no elements in the wishlist
  if (state.count === 0) {
    return <h1> Add more movies to your wishlist</h1>
  }

  // Loading elements
  return isLoading ? (
    <Loading></Loading>
  ) : (
  // Shows the elements
    <section>
      {details.map((detail, i) => (
        <WishItem
          key={`wishItem-${i}`}
          {...detail}
          handleDelete={(id) => handleDelete(id)}
        ></WishItem>
      ))}
    </section>
  )
}
export default WishlistScreen
