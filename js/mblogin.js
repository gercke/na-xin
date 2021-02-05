let loginFlag=false; 

$('.login-submit').on('touchend',function(){
    document.getElementsByClassName('login-login')[0].style.display = "none";
                    document.getElementsByClassName('register-register')[0].style.display = "block";

    let number = $('#student-number').val()
    let password = $('#student-password').val()
    if(!number&&!password || number&&!password || !number&&password) {
        swal({
            title: '请输入学号或密码!',
            icon: 'warning',
            button: '确定',
            className: "mbSweetAlert",
            closeOnClickOutside: false
        })
    } else {
        let data = {
            id: number,
            pwd: password
        }
        let xhr = new XMLHttpRequest()
    
        xhr.open('post', 'http://localhost:8777/' + 'login')

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if(JSON.parse(xhr.responseText).status == '200') {
                    document.getElementsByClassName('login-login')[0].style.display = "none";
                    document.getElementsByClassName('register-register')[0].style.display = "block";
                } else if (JSON.parse(xhr.responseText).status == '302') {
                    swal({
                        title: '您已经报名!',
                        icon: 'info',
                        button: '确定'
                    })
                } else if (JSON.parse(xhr.responseText).status == 'id-pwd-error') {
                    swal({
                        title: '学号或密码错误!',
                        icon: 'warning',
                        button: '确定'
                    })
                } 
            } else if (xhr.status != 200) {
                swal({
                    title: '未知错误,请加群792771841联系管理员',
                    icon: 'warning',
                    button: '确定'
                })
            }
        }
        xhr.setRequestHeader('Content-type', 'application/json') // 请求头根据接口文档设置
    
        xhr.send(JSON.stringify(data))
    }
})