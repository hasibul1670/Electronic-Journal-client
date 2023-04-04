import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export default class Nomatch extends PureComponent {
  render() {
    return (
      <div>    <div class="d-flex align-items-center justify-content-center vh-100">
      <div class="text-center">
          <h1 class="display-1 fw-bold font-weight-bold " >404</h1>
          <p class="fs-3 font-weight-bold "> <span class="text-danger ">Opps!</span> Page not found.</p>
          <p class="lead font-weight-bold ">
              The page you’re looking for doesn’t exist.
            </p>
          <Link to="/" class="btn btn-primary">Go Home</Link>
      </div>
  </div>


     
      </div>
    )
  }
}
    