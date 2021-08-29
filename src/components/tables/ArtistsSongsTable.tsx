import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';



export default function ArtistsSongsTable({ songList, artist }: { songList: any, artist: string }) {

  const columns = [
    {
      field: "TrackName",
      headerName: "Song",
      width: 500,
      editable: true,
      // eslint-disable-next-line react/display-name
      renderCell: (params:  any) => (
        <Link to={`/${artist}/${params.value}`}>{params.value}</Link>
      )
    }
  ];
  

    for (let i = 0; i < songList.length; i++) {
        songList[i].id = i
    }
  return (
    <>
      <Typography variant="h6" id="tableTitle" component="div">
        All charted songs
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={songList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </>
  );
}
