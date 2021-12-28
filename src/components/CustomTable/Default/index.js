import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@mui/lab/Pagination';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

function CustomPagination() {
  const classes = useStyles();

  return (
    <Pagination
      className={classes.root}
      color="primary"
      count={5}
      page={1}
    />
  );
}

export default function CustomPaginationGrid() {
console.log(CustomPagination)

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
      rows={[]}
      columns={[]}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
          Pagination: CustomPagination,
        }}
      />
    </div>
  );
}
