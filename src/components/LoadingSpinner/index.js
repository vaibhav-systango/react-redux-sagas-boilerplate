import React from 'react'
import { ClipLoader } from 'react-spinners'
import PropTypes from 'prop-types'

const Loader = ({ message, color }) => (
  <div className="text-center loader">
    <ul>
      <li>
        <ClipLoader
          sizeUnit={'px'}
          size={65}
          color={'white'}
          loading
        />
      </li>
      <li>
        <h3 style={{ color: color || 'white' }}>
          {message || ''}
        </h3>
      </li>
    </ul>
  </div>
)

Loader.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string
}

export const SmallLoader = () => (
  <div className="text-center small_loader">
    <ClipLoader
      sizeUnit={'px'}
      size={20}
      color={'cyan'}
      loading
    />
  </div>
)

export const CardLoader = () => (
  <div className="text-center dashboard_card_loader">
    <ClipLoader
      sizeUnit={'px'}
      size={20}
      color={'cyan'}
      loading
    />
  </div>
)

export default Loader

