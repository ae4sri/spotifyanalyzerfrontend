import React from 'react';
import spotifyService from '../services/server'
import { useParams } from 'react-router';
import { useHistory } from 'react-router'
import { useEffect } from 'react';
import { useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";

export const SongPage = () => {
    const params: { artist: string, song: string } = useParams()
    const artist = params.artist
    const song = params.song
    const history = useHistory();
    const [ songStats, setSongStats ] = useState({ 
        topTenDates: [], 
        daysOnChart: 0, 
        firstDate: { 'MIN(DATE)': '', Streams: 0, Position: 0 }, 
        lastDate: { 'MAX(DATE)': '', Streams: 0, Position: 0  }, 
        genres: '', 
        highestPosition: { 'MAX(Position)': 0, Date: '', Streams: 0} 
    })

    const genres = songStats.genres.replace('[', '').replace(']', '')
    useEffect(() => {
        async function fetch() {
          try {
            const responseData = await spotifyService.getSongPage(artist, song)
            setSongStats(responseData)
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

    return (
        <>
        <Typography variant="h2" component="h3">
            <b>{song}</b> by <b><Link style={{ textDecoration: 'none' }}  to={`/${artist}`}>{artist}</Link></b>
        </Typography>
        <p>Genres: <b>{genres}</b></p>
        <p>Days on Chart: <b>{songStats.daysOnChart}</b></p>
        <Typography variant="h6" id="tableTitle" component="div">
            Days this song was streamed was most:
        </Typography>
      <Table className={classes.table} size="small" aria-label="a dense table" style={{ maxWidth: '10%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Streams</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songStats.topTenDates.map((date, i) => (
            <TableRow key={i}>
              <TableCell align="left">{date['Date']}</TableCell>
              <TableCell align="left">{date['SUM(Streams)']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p><b>{song}</b> first entered the Spotify Top 200 on <b>{songStats.firstDate['MIN(DATE)']}</b>, 
        at position <b>{songStats.firstDate.Position}</b> with <b>{songStats.firstDate['Streams']}</b> streams.</p>

        <p><b>{song}</b> was last on the Spotify Top 200 on <b>{songStats.lastDate['MAX(DATE)']}</b>, 
        at position <b>{songStats.lastDate.Position}</b> with <b>{songStats.lastDate['Streams']}</b> streams.</p>

        <p><b>{song}</b> peaked on the Spotify Top 200 at position <b>{songStats.highestPosition['MAX(Position)']}</b> on 
        <b> {songStats.highestPosition['Date']}</b> with <b>{songStats.highestPosition['Streams']}</b> streams. </p>
    </>
    )
}