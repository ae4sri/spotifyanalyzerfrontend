import React from "react";
import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";

export const TopTenLongestLasting = ({ topTenLongestLastingSongs, classes, artist }: any) => {
    return (
        <>
        <Typography variant="h6" id="tableTitle" component="div">
            Top ten longest lasting songs on chart
        </Typography>
      <Table className={classes.table} size="small" aria-label="a dense table" style={{ maxWidth: '15%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Track</TableCell>
            <TableCell align="left">Days on Chart</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topTenLongestLastingSongs.map((song: any, i: number) => (
            <TableRow key={i}>
                <TableCell align="left">
                  <Link to={`/${artist}/${song['TrackName']}`}>{song['TrackName']}</Link>
                </TableCell>
              <TableCell align="left">{song['value_occurrence']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </>
    )
}