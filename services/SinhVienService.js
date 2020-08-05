var SinhVienService = function () {

    this.themSinhVien = 'testGit';

    this.xoaSinhVien = function (maSV) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/'+maSV,
            method: 'DELETE',
        })
    }

    this.layThongTinSinhVien = function (maSV) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/'+maSV,
            method: 'GET',
        })
    }

    this.capNhatSinhVien = function (sinhVien) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien',
            method: 'PUT',
            data: sinhVien,
        })
    }
}