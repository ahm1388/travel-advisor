import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getLocationsData } from './api'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

const App = () => {
  const [locations, setLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])

  const [childClicked, setChildClicked] = useState(null)

  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})

  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    const filteredLocations = locations.filter((location) => location.rating > rating)
    setFilteredLocations(filteredLocations)
  }, [rating])

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true)
      getLocationsData(type, bounds.sw, bounds.ne)
        .then((data) => {
          setLocations(data?.filter((location) => location.name && location.num_reviews > 0))
          setFilteredLocations([])
          setIsLoading(false)
        })
    }

  }, [type, bounds])

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List 
            locations={filteredLocations.length ? filteredLocations : locations} 
            childClicked={childClicked}  
            isLoading={isLoading}
            type={type} 
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setCoordinates={setCoordinates} 
            setBounds={setBounds} 
            coordinates={coordinates}
            locations={filteredLocations.length ? filteredLocations : locations}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App