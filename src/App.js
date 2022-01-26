import React, { useEffect, useState } from "react"
import { CssBaseline, Grid } from "@material-ui/core"

import { getPlaces, getWeatherData } from "./api"

import Header from "./components/Header"
import List from "./components/List"
import Map from "./components/Map"
import MapPlaceholder from "./components/Map/Placeholder"

const App = () => {
    const [places, setPlaces] = useState([])
    const [weatherData, setWeatherData] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [defaultCoordinates, setDefaultCoordinates] = useState(null)
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [childClicked, setChildClicked] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState("restaurants")
    const [rating, setRating] = useState("")

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude: lat, longitude: lng} }) => {
            setCoordinates({ lat, lng })
            setDefaultCoordinates({ lat, lng })
        })
    }, [])

    useEffect(() => {
        const filteredPlaces = places.filter(place => place.rating > rating)
        setFilteredPlaces(filteredPlaces)
    }, [rating, places])

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true)

            getWeatherData(coordinates.lat, coordinates.lng)
                .then(data => {
                    console.log({data})
                    setWeatherData(data)
                })

            getPlaces(type, bounds.sw, bounds.ne)
                .then((places) => {
                    setPlaces(places.filter(place => place.name))
                    setFilteredPlaces([])
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [bounds, type])

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    {!defaultCoordinates && <MapPlaceholder />}
                    {defaultCoordinates && <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        defaultCenter={defaultCoordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />}
                </Grid>
            </Grid>
        </>
    )
}

export default App;
