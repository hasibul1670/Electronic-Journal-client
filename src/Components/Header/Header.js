import React, { PureComponent } from 'react'
import Navbar from '../Shared/Navbar'
import Home from './Home'

export default class Header extends PureComponent {
  render() {
    return (
      <div >
<Navbar></Navbar>

<Home></Home>
      



      </div>

    )
  }
}
