import React, { useState, useEffect, createRef } from "react";
import {
    CircularProgress,
    Grid,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@material-ui/core"
import useStyles from "./styles"

import PlaceDetails from "../PlaceDetails"

const List = ({
    places,
    childClicked,
    isLoading,
    type,
    setType,
    rating,
    setRating,
}) => {
    const classes = useStyles()
    const [elRefs, setElRefs]  = useState([])

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef())
        setElRefs(refs)
    }, [places])

    return (
        <div className={classes.container}>
            <Typography variant="h4">Рестораны, Отели, Места</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Тип</InputLabel>
                        <Select value={type} onChange={e => setType(e.target.value)}>
                            <MenuItem value="restaurants">Рестораны</MenuItem>
                            <MenuItem value="hotels">Отели</MenuItem>
                            <MenuItem value="attractions">Достпримечательности</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Рейтинг</InputLabel>
                        <Select value={rating} onChange={e => setRating(e.target.value)}>
                            <MenuItem value="0">Любой</MenuItem>
                            <MenuItem value="3">От 3</MenuItem>
                            <MenuItem value="4">От 4</MenuItem>
                            <MenuItem value="4.5">От 4.5</MenuItem>
                        </Select>
                    </FormControl>

                    <Grid container spacing={3} className={classes.list}>
                        {places?.map((place, index) => {
                            return (
                                <Grid ref={elRefs[index]} item key={index} xs={12}>
                                    <PlaceDetails
                                        place={place} 
                                        selected={Number(childClicked) === index}
                                        refProp={elRefs[index]}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </>
            )}
        </div>
    )
}

export default List;