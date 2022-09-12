import React from 'react'
import GoogleMapReact from 'google-map-react'
import  { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'

const Map = ({ setCoordinates, setBounds, coordinates, locations, setChildClicked }) => {
  const classes = useStyles()
  const isDesktop = useMediaQuery('(min-width:600px')

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={(e) => {
          console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
      
        {locations?.map((location, i) => (
          <div 
            className={classes.markerContainer}
            lat={Number(location.latitude)}
            lng={Number(location.longitude)}
            key={i}
          >
            {
              !isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                    {location.name}
                  </Typography>
                  <img 
                    className={classes.pointer}
                    src={location.photo ? location.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={location.name}
                  />   
                  <Rating size="small" value={Number(location.rating)} readOnly />
                </Paper>
              )
            }

          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map