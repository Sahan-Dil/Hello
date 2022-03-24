import React from 'react';
import usestyles from './styles'
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i }) => {
    const classes = usestyles();

    return (
       <Card className={classes.card}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.media} image={urlToImage || 'https://www.nicepng.com/png/detail/209-2096788_news-transparent-vector-freeuse-news-png.png'} />
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2" >{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2" >{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
            </CardActionArea>

            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">Learn more</Button>
                <Typography variant="h5" color="textSecondary">{i+1}</Typography>
            </CardActions>
       </Card>
    )
}

export default NewsCard;
