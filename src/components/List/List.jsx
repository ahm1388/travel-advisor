import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core'

import LocationDetails from '../LocationDetails/LocationDetails'

import useStyles from './styles'

const List = ({ locations, childClicked, isLoading, type, setType, rating, setRating }) => {
  const classes = useStyles()
  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    const refs = Array(locations?.length).fill().map((_, i) => elRefs[i] || createRef())
  
    setElRefs(refs)
  }, [locations])
  
  return (
    <div className={classes.container}>
      <Typography variant="h4">Restaurants, Hotels, and Attractions Around You</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {locations?.map((location, i) => (
          <Grid item ref={elRefs[i]} key={i} xs={12}>
            <LocationDetails 
              location={location}
              selected={Number(childClicked) === i}
              refProp={elRefs[i]}
            />
          </Grid>
        ))}
      </Grid>
      </>
    )}
    </div>
  )
}

export default List