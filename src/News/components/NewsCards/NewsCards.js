import React from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';
import NewsCard from '../NewsCard/NewsCard';
import useStyles from './styles';


const infoCards =[
    {color:'#00838f', title: 'Powered by "HELLO" voice assistant', text: 'Updating daily..Worlds number one international news service'},
    {color:'#111223', title: 'Latest News From BBC ', text: 'Try Saying:     Give me the latest news'},
    {color:'#111223', title: 'search anything   Any news category ', text: 'Try Saying:     what is up with <anything>'}
];

const NewsCards = ({ articles }) => {

    const classes = useStyles();

    if(!articles.length){
        return(
            <Grow in>
                <Grid className={classes.containerZero} container alignItems="stretch" spacing={3}>
                    {infoCards.map((infoCard) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} className={classes.infoCard}>
                            <div className={classes.card} style={{ backgroundColor:infoCard.color }}>
                                <Typography variant="h5">{infoCard.title}</Typography>
                                <Typography variant="h6"> <br /> <i>{infoCard.text}</i> </Typography>
                            </div>
                        </Grid>
                    ))}      
                </Grid>
            </Grow>
        );
    }

    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {articles.map((article, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ display:'flex'} }>
                        <NewsCard article={article} i={i}/>
                    </Grid>
                 ))}
            </Grid>



          



        </Grow>
    );
}

export default NewsCards;
