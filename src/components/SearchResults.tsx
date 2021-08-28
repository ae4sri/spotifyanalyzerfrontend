import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

export const SearchResults = ({ results }: { results: { songs: Array<{ TrackName: string, Artist: string}>, artists: Array<{ Artist: string}>} }) => {
  const classes = useStyles();
  const [searchSetting, setSearchSetting] = useState('songs')

  useEffect(() => setSearchSetting('songs'),[])

  const handleSubmit = () => {
      console.log("test")
      setSearchSetting(searchSetting === 'songs' ? 'artists' : 'songs')
  }
  if (results.songs.length !== 0) {
  return (
      <>
      {searchSetting}
    <form onChange={handleSubmit}>
    <RadioGroup row aria-label="position" name="position" defaultValue="songs">
        <FormControl>
            <FormControlLabel
            value="songs"
            control={<Radio color="primary" />}
            label="Search Songs" 
            />
            <FormControlLabel
            value="artists"
            control={<Radio color="primary" />}
            label="Search Artists"
            />
        </FormControl>
    </RadioGroup>
    </form>
    {searchSetting === 'songs' ? 
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Song</TableCell>
            <TableCell>Artist</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.songs.map((song, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                <Link to={`/${song.Artist}/${song.TrackName}`}>{song.TrackName}</Link>
              </TableCell>
              <TableCell><Link to={`/${song.Artist}`}>{song.Artist}</Link></TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  : <TableContainer component={Paper}>
  <Table className={classes.table} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Artist</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {results.artists.map((artist, i) => (
        <TableRow key={i}>
          <TableCell>
            <Link to={`/${artist.Artist}`}>{artist.Artist}</Link>
            </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
  
  }
    </>
  );
    }
    return (
        <>
        </>
    )
}
