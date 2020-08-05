var Validation = function () {
    this.kiemTraRong = function(value,selectorError) {
        if (value.trim()==='') {
            document.querySelector(selectorError).innerHTML='Không được bỏ trống trường này!';
            document.querySelector(selectorError).style.display='block';
            return false;
        }
        document.querySelector(selectorError).innerHTML='';
        document.querySelector(selectorError).style.display='none'; // có thể không khai báo display none, do trình duyệt
        return true;
    }

    this.kiemTraAllLetter = function(value,selectorError) {
        const regexAllLetter= /^[a-z A-Z]+$/;    
        if (regexAllLetter.test(value)) {
            document.querySelector(selectorError).innerHTML='';
            return true;
        }
        document.querySelector(selectorError).innerHTML='Không được có số và ký tự đặc biệt!';
        return false;
    }

    this.kiemTraEmail = function(value,selectorError) {
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexEmail.test(value)) {
            document.querySelector(selectorError).innerHTML='';
            return true;
        }
        document.querySelector(selectorError).innerHTML='Email không đúng định dạng';
        return false;
    }

    this.kiemTraID = function(value,selectorError) {
        const regexID = /^[a-zA-Z0-9\/\.\-]+$/;
        if (regexID.test(value)) {
            document.querySelector(selectorError).innerHTML='';
            return true;
        }
        document.querySelector(selectorError).innerHTML='ID không đúng định dạng';
        return false;
    }

    this.kiemTraNumber = function(value) {
        const regetNumber = /^[0-9-.]+$/;
        if (regetNumber.test(value)) {
            return true;
        }
        return false;
    }

    this.kiemTraDiem = function(value,min,max,selectorError) {
        if (this.kiemTraNumber(value)) {
            if (Number(value)>=min && Number(value)<=max) {
                document.querySelector(selectorError).innerHTML='';
                return true;
            }
            document.querySelector(selectorError).innerHTML=`Điểm vượt quá phạm vi ${min} - ${max}`;
            return false;
        }
        
        document.querySelector(selectorError).innerHTML='Điểm phải là số';
        return false;
    }

    this.kiemTraLength = function(value,min,max,selectorError) {
        if (value.length<=max && value.length>=min) {
            document.querySelector(selectorError).innerHTML='';
            return true;
        }
        document.querySelector(selectorError).innerHTML=`Độ dài từ ${min} - ${max}`;
    }

}