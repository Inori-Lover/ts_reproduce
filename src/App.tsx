import React, { Fragment } from 'react'

import Main from './routes/_main'
import Person from './routes/_person'
import ShoppingCar from './routes/_shoppingcar'
import Typelist from './routes/_typelist'

const routeList = [
  <Main />,
  <Person />,
  <ShoppingCar />,
  <Typelist />
]

export default () => (
  <Fragment>
    { routeList }
  </Fragment>
)
