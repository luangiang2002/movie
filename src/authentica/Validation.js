var regeemail = /[^\s@]+@[^\s@]+\.[^\s@]+/;
let regexpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
const Validation = (value) => {
    let error = {};
    if (!value.email) {
        error.email = 'bạn chưa nhập email';
    } else if (!regeemail.test(value.email)) {
        error.email = 'Email sai định dạng ';
    }
    if (!value.pass) {
        error.pass = 'Bạn chưa nhập mật khẩu';
    } else if (!regexpass.test(value.pass)) {
        error.pass = 'Mật khẩu tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường và một số, tối đa 30 ký tự.';
    }
    if (!value.confirmPass) {
        error.confirmPass = 'Bạn chưa nhập lại mật khẩu';
    } else if (value.confirmPass !== value.pass) {
        error.confirmPass = 'Mật khẩu không trùng nhau';
    }
    return error;
};
export default Validation;
