import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ModalUpload = ({ open, onClose }) => {
    const navigate = useNavigate();
    const handleNavigateAndClose = () => {
        setTimeout(() => {
            navigate('/login');
        }, 1000);
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Xin chào</DialogTitle>
            <DialogContent>
                <DialogContentText>Để thực hiện chức năng này bạn cần phải đăng nhập</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
                <Button onClick={handleNavigateAndClose} color="primary">
                    Đăng nhập
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalUpload;
