import React from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { HotelSearchFunction } from '../Utility/HotelSearchFunction'
import { sortByDropDownData } from '../components/AmenityFilterDropdown'

/* class HotelSearch extends React.Component {
  constructor(props) {
    super(props);
    
    const params = new URLSearchParams(this.props.location.search)
    const dateIn = params.get('date_in')
    const dateOut = params.get('date_out')

    let amenities = ''
    let selectedOption = []
    if (pargams.get("amenities") && params.get("amenities") !== '') {
      amenities = params.get("amenities")
      const ifarray = amenities.split(",")
      if (ifarray.constructor === Array) {
        ifarray.forEach((amenity) => {
          const amenityobj = {}
          amenityobj.value = amenity
          amenityobj.label = amenity
          selectedOption.push(amenityobj)
        })
      }
    }
    
  }
}
 */