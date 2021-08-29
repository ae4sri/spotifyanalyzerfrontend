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
          minWidth: 400,
        },
      });

      const classes = useStyles();

    return ( 
        <>  
        <Typography variant="h2">
            <b>{artist}</b>
        </Typography>
        <Typography variant="h6">
        Instances on Spotify Top 200 (how many appearances on chart across all songs and dates): <b>{artistStats['timesOnChart']}</b>
        </Typography>
        <br />
        
            <Grid container spacing={4}  style={{ margin: 0, width: '100%' }} > 
              <Grid item xs={12} sm={4}>
                  <TopTenLongestLasting topTenLongestLastingSongs={artistStats['tenStrongestSongs']} classes={classes} artist={artist} />
              </Grid>
              <Grid item xs={12} sm={4}>
                  <ArtistsSongsTable songList={artistStats['allSongs']} artist={artist} />
              </Grid>
              <Grid item xs={12} sm={4}>
               <StrongestDatesTable tenStrongestDates={artistStats['tenStrongestDates']} classes={classes} artist={artist} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <HighestOnIndividualTable highestIndividualSongStreams={artistStats['highestIndividualSongStreams']} classes={classes} artist={artist}/>
              </Grid>
            </Grid>
    </>
    )
}