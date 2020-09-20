import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Loading } from 'components'

const HomeScreen = lazy(() => import('screens/homeScreen.jsx'))
const DetailItemScreen = lazy(() => import('screens/detailItemScreen.jsx'))
const NotFoundScreen = lazy(() => import('screens/notFoundScreen.jsx'))
const WishlistScreen = lazy(() => import('screens/wishlistScreen.jsx'))

const ScreensRoot = () => (
  <Suspense fallback={<Loading></Loading>}>
    <Switch>
      <Route exact path='/' component={HomeScreen} />
      <Route path='/detail/:id' component={DetailItemScreen} />
      <Route path='/wishlist' component={WishlistScreen} />
      <Route component={NotFoundScreen} />
    </Switch>
  </Suspense>
)

export default ScreensRoot
