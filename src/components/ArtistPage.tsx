import React from 'react';
import spotifyService from '../services/server'
import { useParams } from 'react-router';
import { useHistory } from 'react-router'
import { useEffect } from 'react';
import { useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArtistsSongsTable from './tables/ArtistsSongsTable';
import { TopTenLongestLasting } from './tables/LongestLastingSongsTable';
import { StrongestDatesTable } from './tables/StrongestDatesTable';
import { HighestOnIndividualTable } from './tables/HighestOnIndividualTable';
import Grid from '@material-ui/core/Grid';
export const ArtistPage = () => {
    const params: { artist: string } = useParams()
    const artist = params.artist
    const history = useHistory();
    const [ artistStats, setArtistStats ] = useState({ 
        allSongs: [],
        timesOnChart: 0,
        tenStrongestSongs: [],
        tenStrongestDates: [],
        highestIndividualSongStreams: []
    })

    useEffect(() => {
        async function fetch() {
          try {
            const responseData = await spotifyService.getArtistPage(artist)
            console.log(responseData)
            setArtistStats(responseData)
          } catch(e) {
            history.push('/') // redirect if error with getting songs stats
          }
        }
        fetch()
      }, []
      )
      const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });

      const classes = useStyles();

      const useStylesForGrid = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
      }));

      const gridclasses = useStylesForGrid();



    return (
        <>  
        <Typography variant="h2" component="h3">
            <b>{artist}</b>
        </Typography>
        <p>Times on Chart: <b>{artistStats['timesOnChart']}</b></p>    
        <div className={gridclasses.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TopTenLongestLasting topTenLongestLastingSongs={artistStats['tenStrongestSongs']} classes={classes} artist={artist} />
                </Grid>
                <Grid item xs={6}>
                    <ArtistsSongsTable songList={artistStats['allSongs']} artist={artist} />
                </Grid>
                <Grid item xs={6}>
                <StrongestDatesTable tenStrongestDates={artistStats['tenStrongestDates']} classes={classes} artist={artist} />
                </Grid>
                <Grid item xs={6}>
                <HighestOnIndividualTable highestIndividualSongStreams={artistStats['highestIndividualSongStreams']} classes={classes} artist={artist}/>
            </Grid>
        </Grid>
        </div>      
    </>
    )
}