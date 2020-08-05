var SinhVien = function () { //Khai báo lớp đối tượng dùng dấu =
    this.maSV = '';
    this.tenSV = '';
    this.diemToan = '';
    this.diemLy = '';
    this.diemHoa = '';
    this.diemRenLuyen = '';
    this.eMail = '';
    this.loaiSV='';
    // các biến không thể dùng bên ngoài dấu {}
    this.tinhDTB = function () {
        return ((Number(this.diemToan) + Number(this.diemLy) + Number(this.diemHoa)) / 3).toFixed(2);
    };
    // phương thức (hàm) tinhDTB phải được gọi thông qua sinhVien
    
    this.xepLoai = function () {
        if (this.tinhDTB() >= 5 && Number(this.diemRenLuyen) >= 5) {
            return "Giỏi";
        } else {
            return "Yếu";
        }
    };
}