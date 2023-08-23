import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ModalHome = ({ open, onClose }) => {
    const navigate = useNavigate();
    const handleNavigateAndClose = () => {
        setTimeout(() => {
            navigate('/');
        }, 1000);
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Trờ về trang chủ</DialogTitle>
            <DialogContent>
                <DialogContentText>Bạn xác định muốn trở về trang chủ?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
                <Button onClick={handleNavigateAndClose} color="primary">
                    Trở về
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalHome;
