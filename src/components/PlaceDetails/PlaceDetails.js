import React from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip
} from "@material-ui/core"
import LocationOnIcon from "@material-ui/icons/LocationOnOutlined"
import PhoneIcon from "@material-ui/icons/Phone"
import { Rating } from "@material-ui/lab"

import useStyles from "./styles"

const PlaceDetails = ({ place, selected, refProp }) => {
    const classes = useStyles()

    if(selected) {
        refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    return (
        <Card elevation={6}>
            <CardMedia
                style={{ height: 350 }}
                image={place.photo ? place.photo.images.medium.url : ""}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Rating value={Number(place.rating)} readOnly />
                    <Typography variant="subtitle1" gutterBottom>Из {place.num_reviews} отзывов</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ценник</Typography>
                    <Typography variant="subtitle1" gutterBottom>{place.price_level}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ранжирование</Typography>
                    <Typography variant="subtitle1" gutterBottom>{place.ranking}</Typography>
                </Box>
                {place?.awards?.map((award, index) => (
                    <Box my={1} display="flex" justifyContent="space-between" alignItems="center" key={index}>
                        <img src={award.images.small} alt={award.display_name} />
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({ name }) => (
                    <Chip key={name} size="small" label={name} className={classes.chip} />
                ))}
                {place?.address && (
                    <Typography className={classes.subtitle} variant="body2" color="textSecondary" gutterBottom>
                        <LocationOnIcon />
                        {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography className={classes.spacing} variant="body2" color="textSecondary" gutterBottom>
                        <PhoneIcon />
                        {place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() =>  window.open(place.web_url, '_blank')}
                    >
                         Travel Adviser
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() =>  window.open(place.website, '_blank')}
                    >
                         Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default PlaceDetails;