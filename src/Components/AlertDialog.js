import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const AlertDialog = ({ open, onClose }) => {
    const navigate = useNavigate();
    const handleNavigateAndClose = () => {
        setTimeout(() => {
            navigate('/login');
        }, 1000);
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Đăng ký thành công!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Vui lòng kiểm tra email của bạn để xác nhận tài khoản trước khi đăng nhập.
                </DialogContentText>
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

export default AlertDialog;
