import React from "react";
import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export const StrongestDatesTable = ({ tenStrongestDates, classes, artist }: any) => {
    return (
        <>
        <Typography variant="h6" id="tableTitle" component="div">
            Dates when <b>{artist}</b> streamed most (on Top 200)
        </Typography>
      <Table className={classes.table} size="small" aria-label="a dense table" style={{ maxWidth: '15%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Streams On Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tenStrongestDates.map((date: any, i: any) => (
            <TableRow key={i}>
              <TableCell align="left">{date['Date']}</TableCell>
              <TableCell align="left">{date['SUM(Streams)']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </>
    )
}