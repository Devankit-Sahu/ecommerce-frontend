import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { orderStatus } from "../../constants/constants";
import { getDatesWithLabels } from "../../utils/utils";

const OrderUpdateDialog = ({
  open,
  handleClose,
  selectedStatus,
  handleStatusChange,
  selectedDate,
  handleDateChange,
  handleUpdateOrder,
}) => {
  const dates = getDatesWithLabels();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Update Order Status</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Order Status"
          value={selectedStatus}
          onChange={handleStatusChange}
          fullWidth
          margin="normal"
        >
          {orderStatus.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Delivery Date"
          value={selectedDate}
          onChange={handleDateChange}
          fullWidth
          margin="normal"
        >
          {dates.map(({ date, label }) => (
            <MenuItem key={date} value={date}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdateOrder}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderUpdateDialog;
