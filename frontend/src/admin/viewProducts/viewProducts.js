import React, { useState, useCallback } from "react";
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
import "./viewProducts.css"

const columns = [
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = useCallback(async () => {
    const res = await fetch("http://localhost:4000/getTopProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const productD = await res.json();
    setProductData(productD);
  }, []);

  const getAllData = useCallback(async () => {
    const res = await fetch("http://localhost:4000/getAllproducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const allproductD = await res.json();
    setAllProductData(allproductD);
  }, []);

  const handleAllProductEdit = (id) => {
    Navigate(`/editallproduct/:${id}`);
    console.log(id);
  };

  const getBlogData = useCallback(async () => {
    const res = await fetch("http://localhost:4000/getBlogProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const blogProductD = await res.json();
    setBlogProductData(blogProductD);
  }, []);

  const handleBlogProductEdit = (id) => {
    Navigate(`/editblogproduct/:${id}`);
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
  }, [getData, getAllData, getBlogData]);

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
                              src={product.selectedImage || product.selectedAllImage || product.blogSelectedImage}
                              alt=""
                            />
                          </TableCell>
                          <TableCell>{product.title || product.alltitle || product.blogTitle}</TableCell>
                          <TableCell>{product.description || product.alldescription || product.blogDescription}</TableCell>
                          <TableCell>{product.price || product.allprice || product.blogPrice}</TableCell>
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
              count={productData.length}
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
                              src={products.selectedAllImage || products.selectedImage || products.blogSelectedImage}
                              alt=""
                            />
                          </TableCell>
                          <TableCell>{products.alltitle || products.title || products.blogTitle}</TableCell>
                          <TableCell>{products.alldescription || products.description || products.blogDescription}</TableCell>
                          <TableCell>{products.allprice || products.price || products.blogPrice}</TableCell>
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
                                Delete Product
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Are you sure you want to delete product?
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
              count={allproductData.length}
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
                              src={product.blogSelectedImage || product.selectedImage || product.selectedAllImage}
                              alt=""
                            />
                          </TableCell>
                          <TableCell>{product.blogTitle || product.title || product.alltitle}</TableCell>
                          <TableCell>{product.blogDescription || product.description || product.alldescription}</TableCell>
                          <TableCell>PKR {product.blogPrice || product.price || product.allprice}.00</TableCell>
                          <TableCell>
                            <EditIcon
                              sx={{ fontSize: "30px", cursor: "pointer" }}
                              onClick={() => handleBlogProductEdit(product._id)}
                            />



                              {/* Delete Blog Products Confirmation Dialog */}
                              <Dialog
                              open={isDeleteBlogDialogOpen}
                              onClose={handleCloseDeleteBlogDialog}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description">
                              <DialogTitle id="alert-dialog-title">
                                Delete Product
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Are you sure you want to delete product?
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
              count={blogProductData.length}
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
