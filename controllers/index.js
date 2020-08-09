// Tạo mảng sinh viên chứa thông tin sinh viên
// mảng trong JS thực chất là linkedList
var mangSinhVien = [];
var validate = new Validation();


document.querySelector('#btnThemSV').onclick = function () {
    // Lấy thông tin sinh viên thêm vào đối tượng sinh viên
    var sinhVien = new SinhVien();
    sinhVien.maSV=document.getElementById('maSV').value;
    sinhVien.tenSV=document.getElementById('tenSV').value;
    sinhVien.eMail=document.getElementById('eMail').value;
    sinhVien.loaiSV=document.getElementById('loaiSV').value;
    sinhVien.diemToan=document.getElementById('diemToan').value;
    sinhVien.diemLy=document.getElementById('diemLy').value;
    sinhVien.diemHoa=document.getElementById('diemHoa').value;
    sinhVien.diemRenLuyen=document.getElementById('diemRenLuyen').value;
    console.log(sinhVien);


    // Kiểm tra nếu đúng định dạng mới được đưa vào mảng
    var valid=validate.kiemTraRong(sinhVien.maSV,'#error-maSV')
    & validate.kiemTraRong(sinhVien.tenSV,'#error-tenSV')&validate.kiemTraRong(sinhVien.eMail,'#error-eMail')&validate.kiemTraRong(sinhVien.diemToan,'#error-diemToan')&validate.kiemTraRong(sinhVien.diemLy,'#error-diemLy')&validate.kiemTraRong(sinhVien.diemHoa,'#error-diemHoa')&validate.kiemTraRong(sinhVien.diemRenLuyen,'#error-diemRenLuyen');

    // document.getElementById('error-maSV').innerHTML='';
    // document.getElementById('error-tenSV').innerHTML='';
    // document.getElementById('error-eMail').innerHTML='';
    // document.getElementById('error-diemToan').innerHTML='';
    // document.getElementById('error-diemLy').innerHTML='';
    // document.getElementById('error-diemHoa').innerHTML='';
    // document.getElementById('error-diemRenLuyen').innerHTML='';
    
    // // kiểm tra dữ liệu hợp lệ trước khu thêm vào mảng
    // // trim() để loại bỏ khoảng trống đầu cuối của chuỗi
    // if (sinhVien.maSV.trim()==='') {
    //     document.getElementById('error-maSV').innerHTML='Mã sinh viên không được trống!';
    //     valid=false;
    // }
    // if (sinhVien.tenSV.trim()==='') {
    //     document.getElementById('error-tenSV').innerHTML='Tên sinh viên không được trống!';
    //     valid=false;
    // }
    // if (sinhVien.eMail==='') {
    //     document.getElementById('error-eMail').innerHTML='Email không được trống!';
    //     valid=false;
    // }
    // if (sinhVien.diemToan==='') {
    //     document.getElementById('error-diemToan').innerHTML='Email không được trống!';
    //     valid=false;
    // }
    // if (sinhVien.diemLy==='') {
    //     document.getElementById('error-diemLy').innerHTML='Email không được trống!';
    //     valid=false;
    // }
    // if (sinhVien.diemHoa==='') {
    //     document.getElementById('error-diemHoa').innerHTML='Email không được trống!';
    //     valid=false;
    // }
    // if (sinhVien.diemRenLuyen==='') {
    //     document.getElementById('error-diemRenLuyen').innerHTML='Email không được trống!';
    //     valid=false;
    // }

    
    // Kiểm tra tên là ký tự
    valid &=validate.kiemTraAllLetter(sinhVien.tenSV,'#error-allLetter-tenSV');

    // Kiểm tra email

    valid &=validate.kiemTraEmail(sinhVien.eMail,'#error-format-eMail');
    valid &=validate.kiemTraID(sinhVien.maSV,'#error-format-maSV') & validate.kiemTraLength(sinhVien.maSV,5,10,'#error-length-maSV');
    valid &=validate.kiemTraDiem(sinhVien.diemToan,0,10,'#error-format-diemToan')&validate.kiemTraDiem(sinhVien.diemLy,0,10,'#error-format-diemLy')&validate.kiemTraDiem(sinhVien.diemHoa,0,10,'#error-format-diemHoa')&validate.kiemTraDiem(sinhVien.diemRenLuyen,0,100,'#error-format-diemRenLuyen');

    if (!valid) {
        return;
    }




    // push() phương thức thêm 1 phần tử vào mảng
    mangSinhVien.push(sinhVien);
    
    // gọi hàm lưu vào local storage
    luuLocalStorage();

    renderTableSinhVien(mangSinhVien);



    // // tạo nội dung thẻ trSinhVien
    // var trSinhVien=document.createElement('tr');

    // // tạo nội dung thẻ tdSinhVien
    // var tdMaSinhVien=document.createElement('td'); //tạo thẻ mới
    // tdMaSinhVien.innerHTML=sinhVien.maSV;
    
    // var tdTenSinhVien=document.createElement('td');
    // tdTenSinhVien.innerHTML=sinhVien.tenSV;
    
    // var tdEmail=document.createElement('td');
    // tdEmail.innerHTML=sinhVien.eMail;
    
    // var tdLoaiSinhVien=document.createElement('td');
    // tdLoaiSinhVien.innerHTML=sinhVien.xepLoai();
    
    // var tdDTB=document.createElement('td');
    // tdDTB.innerHTML=sinhVien.tinhDTB();
    
    // var tdDiemRenLuyen=document.createElement('td');
    // tdDiemRenLuyen.innerHTML=sinhVien.diemRenLuyen;

    // var tdAction=document.createElement('td');
    // var btnXoa=document.createElement('button');
    // btnXoa.className= 'btn btn-danger';
    // btnXoa.id= 'btnXoa';
    // btnXoa.innerHTML= 'Xóa';
    // btnXoa.onclick=function() {
    //     btnXoa.parentElement.parentElement.remove();
    // }

    // tdAction.appendChild(btnXoa);

    // // trSinhVien.innerHTML=tdMaSinhVien+tdTenSinhVien+tdEmail+tdLoaiSinhVien+tdDTB+tdDiemRenLuyen;
    // // appendChild để chèn thẻ con vào
    // trSinhVien.appendChild(tdMaSinhVien);
    // trSinhVien.appendChild(tdTenSinhVien);
    // trSinhVien.appendChild(tdEmail);
    // trSinhVien.appendChild(tdLoaiSinhVien);
    // trSinhVien.appendChild(tdDTB);
    // trSinhVien.appendChild(tdDiemRenLuyen);
    // trSinhVien.appendChild(tdAction);

    // console.log(trSinhVien);
    
    // document.getElementById('tableSinhVien').appendChild(trSinhVien);
}

var xoaSinhVien = function (maSV) {
    //từ mã SV tìm ra phần tử cần xóa
    for (let index = mangSinhVien.length-1; index >=0; index--) {
        // duyệt từng thằng sinh viên
        var sinhVien = mangSinhVien[index];
        //Nếu sinh viên đang duyệt mà bằng với mã sinh viên truyền vào
        if (sinhVien.maSV == maSV) {
            //tại vị trí đó mình sẽ xóa phần tử đó đi
            mangSinhVien.splice(index,1);
        }
    }
    
    renderTableSinhVien(mangSinhVien);
    luuLocalStorage();
}

var renderTableSinhVien = function (mang) {
    // từ dữ liệu, mảng tạo ra các thẻ tr tương ứng
    var chuoiTr='';
    for (let index = 0; index < mang.length; index++) {
        //mỗi lần duyệt lấy ra dữ liệu cua 1 sinh viên trong mảng
        var sinhVien = mangSinhVien[index];

        //--- tạo object mới lấy dữ liệu từ mangSV[i] gán qua
        var sv = new SinhVien();
        sv.maSV=sinhVien.maSV;
        sv.tenSV=sinhVien.tenSV;
        sv.eMail=sinhVien.eMail;
        sv.diemHoa=sinhVien.diemHoa;
        sv.diemLy=sinhVien.diemLy;
        sv.diemRenLuyen=sinhVien.diemRenLuyen;
        sv.diemToan=sinhVien.diemToan;
        //---

        //từ dữ liệu sinh viên, tạo ra dòng tr tương ứng
        chuoiTr +=
        `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.eMail}</td>
                <td>${sv.xepLoai()}</td>
                <td>${sv.tinhDTB()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.maSV}')">Xóa</button></td>
            </tr>
        `
    }
    //Thoát vòng lặp
    document.getElementById('tableSinhVien').innerHTML=chuoiTr;
}


//Lưu local storage
var luuLocalStorage = function () {
    // biến mangSinhVIen --> chuỗi
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    // lưu vào local storage
    localStorage.setItem('mangSinhVien',sMangSinhVien);
}

//Lấy dữ liệu từ local storage

var layDuLieuLocalStorage = function () {
    if (localStorage.getItem('mangSinhVien')) {
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
        //Chuyến chuỗi về mảng (object) và gán cho mangSinhVien
        mangSinhVien = JSON.parse(sMangSinhVien);
        console.log(sMangSinhVien);
        renderTableSinhVien(mangSinhVien);
    }
}

layDuLieuLocalStorage();

var hienThiThongTinSinhVIen = function () {
    console.log('Tấn code, hiển thị thông tin sinh viên');
}


console.log(axios);