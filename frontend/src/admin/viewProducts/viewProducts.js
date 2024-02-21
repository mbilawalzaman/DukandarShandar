import React, {useEffect, useState} from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "./viewProducts.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const columns:  Column[] = [
  { id: 'image', label: 'Product Image', minWidth: 170 },
  {
    id: 'product_title',
    label: 'Title',
    minWidth: 170,
  },
  {
    id: 'product_description',
    label: 'Description',
    minWidth: 170,
  },
  {
    id: 'product_price',
    label: 'Price',
    minWidth: 170,
  },
  {
    id: 'edit-delete',
    label: 'Edit & Delete',
    minWidth: 170,
  },

 ];

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function ViewProducts() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productData, setProductData] = React.useState([])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = async () => {
    const res = await fetch("http://localhost:4000/getTopProducts", {
      method: "GET",
      headers:{
        "Content-Type": "application/json"
      }
    });
    const productD = await res.json();
    setProductData(productD);
  }
  
  React.useEffect(() => {
    getData();
  },[])
  console.log("checkData", productData)

  return (
    <>
    <div className='viewProducts-Container'> 
    <h1 className='viewProducts-heading'>View Products</h1>
      <div className='viewProducts'><Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              productData.map((product) => {
                return (
                  <>
                  <TableRow>
                  <TableCell><img style={{height:"60px", width:"80px"}} src={product.selectedImage} alt=""/></TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell><EditIcon sx={{fontSize:"30px", cursor:"pointer"}}/><DeleteIcon sx={{marginLeft:"1rem", fontSize:"30px", cursor:"pointer", color:"red" }}/></TableCell>
                  </TableRow>
                  </> 
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
    </div>
    </>
  );
}
