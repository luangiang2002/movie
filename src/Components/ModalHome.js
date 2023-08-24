import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ModalHome = ({ location, open, onClose }) => {
    const navigate = useNavigate();
    const handleNavigateAndClose = () => {
        setTimeout(() => {
            location === 'home' ? navigate(`/`) : navigate(`/${location}`);
        }, 1000);
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Bạn xác định muốn rời đi?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Những thao tác bạn đã thực hiện sẽ bị mất, hãy cân nhắc trước khi chuyển tiếp trang
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
                <Button onClick={handleNavigateAndClose} color="primary">
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalHome;
