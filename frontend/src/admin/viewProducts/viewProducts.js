import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const columns: Column[] = [
  { id: "image", label: "Product Image", minWidth: 170 },
  {
    id: "product_title",
    label: "Title",
    minWidth: 170,
  },
  {
    id: "product_description",
    label: "Description",
    minWidth: 170,
  },
  {
    id: "product_price",
    label: "Price",
    minWidth: 170,
  },
  {
    id: "edit-delete",
    label: "Edit & Delete",
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
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function ViewProducts() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productData, setProductData] = React.useState([]);
  const [allproductData, setAllProductData] = useState([]);
  const [blogProductData, setBlogProductData] = useState([]);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const [isDeleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [deleteAllProductId, setAllDeleteProductId] = useState(null);

  const [isDeleteBlogDialogOpen, setDeleteBlogDialogOpen] = useState(false);
  const [deleteBlogProductId, setBlogDeleteProductId] = useState(null);

  const Navigate = useNavigate("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = async () => {
    const res = await fetch("http://localhost:4000/getTopProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const productD = await res.json();
    setProductData(productD);
  };

  const getAllData = async () => {
    const res = await fetch("http://localhost:4000/getAllproducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const allproductD = await res.json();
    setAllProductData(allproductD);
  };

  const getBlogData = async () => {
    const res = await fetch("http://localhost:4000/getBlogProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const blogProductD = await res.json();
    setBlogProductData(blogProductD);
  };

  const handleAllProductEdit = (id) => {
    Navigate(`/editproduct/:${id}`);
    console.log(id);
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteProductId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteProductId(null);
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteProductId) {
      const response = await fetch(
        `http://localhost:4000/deleteproduct/${deleteProductId}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        toast.success("Product Deleted successfully");

        // Update the state to remove the deleted product
        setProductData((prevData) =>
          prevData.filter((product) => product._id !== deleteProductId),
        );
        // setAllProductData(prevData => prevData.filter(product => product._id !== deleteProductId));
        // setBlogProductData(prevData => prevData.filter(product => product._id !== deleteProductId));
      } else {
        toast.error("Error Deleting Product");
      }

      // Close the dialog after deletion
      handleCloseDeleteDialog();
    }
  };

  // handle delete all products

  const handleOpenDeleteAllDialog = (id) => {
    setAllDeleteProductId(id);
    setDeleteAllDialogOpen(true);
  };

  const handleCloseDeleteAllDialog = () => {
    setAllDeleteProductId(null);
    setDeleteAllDialogOpen(false);
  };

  const handleConfirmDeleteAll = async () => {
    if (deleteAllProductId) {
      const response = await fetch(
        `http://localhost:4000/deleteallproduct/${deleteAllProductId}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        toast.success("Product Deleted successfully");

        // Update the state to remove the deleted product
        setAllProductData((prevData) =>
          prevData.filter((product) => product._id !== deleteAllProductId),
        );
      } else {
        toast.error("Error Deleting Product");
      }

      // Close the dialog after deletion
      handleCloseDeleteAllDialog(); // Use the correct close dialog function
    }
  };

// handle delete blog products
const handleOpenDeleteBlogDialog = (id) => {
  setBlogDeleteProductId(id);
  setDeleteBlogDialogOpen(true);
};

const handleCloseDeleteBlogDialog = () => {
  setBlogDeleteProductId(null);
  setDeleteBlogDialogOpen(false);
};

const handleConfirmDeleteBlog = async () => {
  if (deleteBlogProductId) {
    const response = await fetch(
      `http://localhost:4000/deleteblogproduct/${deleteBlogProductId}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      toast.success("Blog Product Deleted successfully");

      // Update the state to remove the deleted blog product
      setBlogProductData((prevData) =>
        prevData.filter((product) => product._id !== deleteBlogProductId),
      );
    } else {
      toast.error("Error Deleting Blog Product");
    }

    // Close the dialog after deletion
    handleCloseDeleteBlogDialog();
  }
};

  React.useEffect(() => {
    getData();
    getAllData();
    getBlogData();
  }, []);

  return (
    <>
      <div className="viewProducts-Container">
        <h1 className="viewProducts-heading"> Top Searched Products</h1>
        <div className="viewProducts">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productData.map((product) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>
                            <img
                              style={{ height: "60px", width: "80px" }}
                              src={product.selectedImage}
                              alt=""
                            />
                          </TableCell>
                          <TableCell>{product.title}</TableCell>
                          <TableCell>{product.description}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>
                            <EditIcon
                              sx={{ fontSize: "30px", cursor: "pointer" }}
                              onClick={() => handleAllProductEdit(product._id)}
                            />
                            {/* Delete Confirmation Dialog */}
                            <Dialog
                              open={isDeleteDialogOpen}
                              onClose={handleCloseDeleteDialog}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description">
                              <DialogTitle id="alert-dialog-title">
                                Delete Product
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Are you sure you want to delete this product?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={handleCloseDeleteDialog}
                                  color="primary">
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleConfirmDelete}
                                  color="primary"
                                  autoFocus>
                                  Delete
                                </Button>
                              </DialogActions>
                            </Dialog>
                            <DeleteIcon
                              sx={{
                                marginLeft: "1rem",
                                fontSize: "30px",
                                cursor: "pointer",
                                color: "red",
                              }}
                              onClick={() =>
                                handleOpenDeleteDialog(product._id)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
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

      <div className="viewProducts-Container">
        <h1 className="viewProducts-heading">View All Products</h1>
        <div className="viewProducts">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allproductData.map((products) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>
                            <img
                              style={{ height: "60px", width: "80px" }}
                              src={products.selectedAllImage}
                              alt=""
                            />
                          </TableCell>
                          <TableCell>{products.alltitle}</TableCell>
                          <TableCell>{products.alldescription}</TableCell>
                          <TableCell>{products.allprice}</TableCell>
                          <TableCell>
                            <EditIcon
                              sx={{ fontSize: "30px", cursor: "pointer" }}
                              onClick={() => handleAllProductEdit(products._id)}
                            />

                            {/* Delete All Products Confirmation Dialog */}
                            <Dialog
                              open={isDeleteAllDialogOpen}
                              onClose={handleCloseDeleteAllDialog}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description">
                              <DialogTitle id="alert-dialog-title">
                                Delete All Products
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Are you sure you want to delete all products?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={handleCloseDeleteAllDialog}
                                  color="primary">
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleConfirmDeleteAll}
                                  color="primary"
                                  autoFocus>
                                  Delete
                                </Button>
                              </DialogActions>
                            </Dialog>

                            <DeleteIcon
                              sx={{
                                marginLeft: "1rem",
                                fontSize: "30px",
                                cursor: "pointer",
                                color: "red",
                              }}
                              onClick={() =>
                                handleOpenDeleteAllDialog(products._id)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
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

      <div className="viewProducts-Container">
        <h1 className="viewProducts-heading">Blog Products</h1>
        <div className="viewProducts">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogProductData.map((product) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>
                            <img
                              style={{ height: "60px", width: "80px" }}
                              src={product.blogSelectedImage}
                              alt=""
                            />
                          </TableCell>
                          <TableCell>{product.blogTitle}</TableCell>
                          <TableCell>{product.blogDescription}</TableCell>
                          <TableCell>PKR {product.blogPrice}.00</TableCell>
                          <TableCell>
                            <EditIcon
                              sx={{ fontSize: "30px", cursor: "pointer" }}
                              onClick={() => handleAllProductEdit(product._id)}
                            />



                              {/* Delete Blog Products Confirmation Dialog */}
                              <Dialog
                              open={isDeleteBlogDialogOpen}
                              onClose={handleCloseDeleteBlogDialog}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description">
                              <DialogTitle id="alert-dialog-title">
                                Delete All Products
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Are you sure you want to delete all products?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={handleCloseDeleteBlogDialog}
                                  color="primary">
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleConfirmDeleteBlog}
                                  color="primary"
                                  autoFocus>
                                  Delete
                                </Button>
                              </DialogActions>
                            </Dialog>

                            <DeleteIcon
                              sx={{
                                marginLeft: "1rem",
                                fontSize: "30px",
                                cursor: "pointer",
                                color: "red",
                              }}
                              onClick={() => handleOpenDeleteBlogDialog(product._id)}
                            />
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
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
