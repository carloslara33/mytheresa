import React, { createContext, useContext, useReducer } from 'react'

const StoreContext = createContext()
const initialState = { wishlist: [], count: 0 }

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      state.wishlist.push(action.id)
      return {
        wishlist: state.wishlist,
        count: state.count + 1,
      }
    case 'delete':
      const newWishList = state.wishlist.filter((wish) => wish != action.id)
      return {
        wishlist: newWishList,
        count: newWishList.length,
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
