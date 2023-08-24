import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ModalDetele = ({ open, onClose, onDelete }) => {
    const handleNavigateAndClose = () => {
        onDelete();
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Xóa</DialogTitle>
            <DialogContent>
                <DialogContentText>Bạn xác định muốn xóa?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
                <Button onClick={handleNavigateAndClose} color="primary">
                    Xóa
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalDetele;
