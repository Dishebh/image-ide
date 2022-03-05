import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(sNo, name, rollNumber, email) {
  return { sNo, name, rollNumber, email };
}

const rows = [
  createData(1, 'Dishebh Bhayana', 184077, '184077@nith.ac.in'),
  createData(2, 'Yajur Gaur', 184036, '184036@nith.ac.in'),
  createData(3, 'Aditya Kumar', 184082, '184082@nith.ac.in'),
  createData(4, 'Yougender Sugali', 184066, '184066@nith.ac.in'),
];

export default function Team() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>S.No</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Full Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Roll Number</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Email Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.sNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.sNo}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.rollNumber}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
