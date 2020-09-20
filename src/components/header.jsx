import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'store'

function Header() {
  const { state } = useStore()

  return (
    <div className='container'>
      <header className='header'>
        <Link to='/'>
          <img
            src='https://www.mytheresa.com/skin/frontend/mytheresa/default/images/logo.png?v=20200908T165408'
            width='293'
            alt='mytheresa.com'
            className='header__logo'
          />
        </Link>
        <Link to='/wishlist'>
          <button>{`Wishlist ${state.count}`}</button>
        </Link>
      </header>
    </div>
  )
}

export default Header
