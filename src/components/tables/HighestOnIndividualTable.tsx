import React from "react";
import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";

export const HighestOnIndividualTable = ({ highestIndividualSongStreams, classes, artist }: any) => {
    return (
        <>
     <Typography variant="h6" id="tableTitle" component="div">
            Highest daily streams on individual songs
        </Typography>
      <Table className={classes.table} size="small" aria-label="a dense table" style={{ maxWidth: '15%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Song</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Streams</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {highestIndividualSongStreams.map((date: any, i: number) => (
            <TableRow key={i}>
              <TableCell align="left"><Link to={`/${artist}/${date['Trackname']}`}>{date['Trackname']}</Link></TableCell>
              <TableCell align="left">{date['date']}</TableCell>
              <TableCell align="left">{date['Streams']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </>
    )
}