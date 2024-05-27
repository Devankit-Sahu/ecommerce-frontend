import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ProductDeleteDialog = ({ open, handleClose, deleteProductHandler }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure do want to delete this product?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action can't be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>cancel</Button>
        <Button onClick={deleteProductHandler} variant="contained">
          yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDeleteDialog;
