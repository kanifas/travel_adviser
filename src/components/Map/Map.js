import React from "react"
import GoogleMapReact from "google-map-react"
import { Paper, Typography, useMediaQuery } from "@material-ui/core"
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import { Rating } from "@material-ui/lab"
import useStyles from "./styles" 

const Map = ({
    setCoordinates,
    setBounds,
    coordinates,
    defaultCenter,
    places,
    setChildClicked,
    weatherData,
}) => {
    const classes = useStyles()
    const isDesktop = useMediaQuery('(min-width: 600px)')

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={defaultCenter}
                center={coordinates}
                defaultZoom={11.57}
                margin={[50, 50, 50, 50]}
                // options={{
                //     disableDefaultUI: true,
                //     zoomControl: true,
                //     styles: mapStyles
                // }}
                onChange={(event) => {
                    setCoordinates({
                        lat: event.center.lat,
                        lng: event.center.lng
                    })
                    setBounds({
                        ne: event.marginBounds.ne, 
                        sw: event.marginBounds.sw
                    })
                }}
                onChildClick={child => setChildClicked(child)}
            >
                {places?.map((place, index) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={index}
                    >
                        {!isDesktop ? (
                            <LocationOnOutlinedIcon color="primary" fontSize="large" />
                        ): (
                            <Paper elevetion={3} className={classes.paper}>
                                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                    {place.name}
                                </Typography>
                                <img
                                    className={classes.pointer}
                                    src={place.photo ? place.photo.images.small.url : ""}
                                    alt={place.name}
                                />
                                <Rating size="small" value={Number(place.rating)} readOn />
                            </Paper>
                        )}
                    </div>
                ))}
                {weatherData?.list?.map((data, index) => (
                    <div key={index} lat={data.coord.lat} lng={data.coord.lon}>
                        <img height="100" src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather" />
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map;