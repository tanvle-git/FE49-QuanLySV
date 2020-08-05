// Khai báo svService tương tác API
var svService = new SinhVienService();

//------GIAO TIẾP VỚI API THÔNG QUA AXIOS-----------

var getAPISinhVien = function() {
    var objectAPI = {
        url:'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien', //đường dẫn đến file hoặc link
        method: 'GET', // phương thức backeng cung cấp
    }
    
    // Gửi yêu cầu dữ liệu đến backend -> backend trẩ về promise
    var promise = axios(objectAPI);
    
    //xử lý thành công
    var funcSuccess = function (result) { //result này tự động được truyền vào từ hàm then().
        console.log(result.data);
        //Sau khi lấy được data --> render lại table
        renderTableSinhVien(result.data);
    }
    
    //xử lý thất bại
    var funcFail = function (error) {
        console.log(error);
    }
    
    //then(): hàm nhận vào giá trị là 1 hàm xử lý thành công
    //catch(): hàm nhận vào giá trị là 1 hàm xử lý thất bại
    promise.then(funcSuccess).catch(funcFail);
}

getAPISinhVien();

// Ajax là kỹ thuật xử lý bất đồng bộ, trong thời gian chờ phản hồi từ server, phần mềm vẫn tiếp tục chạy.
// phần mềm đồng bộ là chạy xong dòng 1 mới đến dòng 2 --> 3 --> 4

var renderTableSinhVien = function (mangSinhVien) {
    var contentTable='';
    for (let index = 0; index < mangSinhVien.length; index++) {
        //lấy ra từng sinh viên trong dữ liệu backend trả về
        var sinhVien = mangSinhVien[index];
        //Tạo ra 1 sv object từ prototype sinh viên
        var sv = new SinhVien();
        sv.maSV = sinhVien.MaSV;
        sv.tenSV = sinhVien.HoTen;
        sv.eMail = sinhVien.Email;
        sv.diemToan = sinhVien.DiemToan;
        sv.diemLy = sinhVien.DiemLy;
        sv.diemHoa = sinhVien.DiemHoa;
        sv.diemRenLuyen = 5;
        contentTable +=
        `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.eMail}</td>
                <td>${sv.xepLoai()}</td>
                <td>${sv.tinhDTB()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td><button class="btn btn-primary" onclick="chinhSuaSinhVien('${sv.maSV}')">Chỉnh sửa</button></td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSV}')">Xóa</button></td>
            </tr>
        `
    }
    //dom đến giao diện ghi thông tin dữ liệu vào
    document.getElementById('tableSinhVien').innerHTML = contentTable;
}

//-------------CHỈNH SỬA SINH VIÊN---------------------
var chinhSuaSinhVien = function (maSV) {
    var promise = svService.layThongTinSinhVien(maSV);

    promise.then(function(result) {
        var sinhVienEdit = result.data;
        document.getElementById('maSV').value=sinhVienEdit.MaSV;
        document.getElementById('tenSV').value=sinhVienEdit.HoTen;
        document.getElementById('eMail').value=sinhVienEdit.Email;
        document.getElementById('diemToan').value=sinhVienEdit.DiemToan;
        document.getElementById('diemLy').value=sinhVienEdit.DiemLy;
        document.getElementById('diemHoa').value=sinhVienEdit.DiemHoa;

        // khóa mã SV lại, không cho người dùng chỉnh sửa
        document.getElementById('maSV').disabled=true;
        document.getElementById('btnThemSV').disabled=true;
        document.getElementById('btnChinhSua').disabled = false;
    }).catch(function(error) {
        console.log(error);
    })
}

//-------------------LƯU THÔNG TIN SINH VIÊN ĐÃ ĐƯỢC CHỈNH SỬA-----------------------
document.getElementById('btnChinhSua').onclick = function () {
    // lấy thông tin sinh viên gán vào data gửi lên API
    var sinhVienCapNhat = {
        MaSV: document.getElementById('maSV').value,
        HoTen: document.getElementById('tenSV').value,
        Email: document.getElementById('eMail').value,
        SoDT: 113,
        CMND: 114,
        DiemToan: document.getElementById('diemToan').value,
        DiemLy: document.getElementById('diemLy').value,
        DiemHoa: document.getElementById('diemHoa').value,
    }

    // Gọi service cập nhật dữ liệu server
    var promise = svService.capNhatSinhVien(sinhVienCapNhat);

    promise.then(function(result) {
        console.log(result.data);
        //Load lại table
        getAPISinhVien();
        //Mở khóa út thêm sinh viên
        document.getElementById('btnThemSV').disabled = false;
        document.getElementById('maSV').disabled = false;
        document.getElementById('btnChinhSua').disabled = true;
    })
}

//-------------THÊM DỮ LIỆU LÊN SERVER QUA API POST-----------------
document.getElementById('btnThemSV').onclick = function () {
    //Lấy thoog tin từ người dùng
    var sinhVien={
        MaSV: document.getElementById('maSV').value,
        HoTen: document.getElementById('tenSV').value,
        Email: document.getElementById('eMail').value,
        SoDT: 113,
        CMND: 114,
        DiemToan: document.getElementById('diemToan').value,
        DiemLy: document.getElementById('diemLy').value,
        DiemHoa: document.getElementById('diemHoa').value,
    }
    console.log(sinhVien);

    // Dùng axios gọi ajax đưa dữ liệu lên backend xử lý
    var objectAxios = {
        url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
        method: 'POST',
        data: sinhVien //thuộc tính backend yêu cầu, front end phải gửi đi đúng định dạng.
    }

    var promise = axios(objectAxios);
    promise.then(function(result)  {
        
    getAPISinhVien();
        console.log(result.data);
    }).catch(function(error) {
        console.log(error);
    })   
}

//------XÓA SINH VIÊN------
var xoaSinhVien = function (maSV) {
    //dùng service gọi api xóa
    var promse = svService.xoaSinhVien(maSV);

    promse.then(function(result){
        //xóa thành công thì lòa lại api get LayDanhSachSinhVien
        getAPISinhVien();
        console.log(result.data)
    }).catch(function(error){
        console.log(error);
    })
}
