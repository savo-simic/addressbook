// Pass csrf token in ajax header
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$('#login').click(function() {
    let email = $("#email").val();
    let password = $("#password").val();
    let token = $("meta[name='csrf-token']").attr("content");

    $.ajax({
        type:"POST",
        url: 'http://localhost:88/api/login-user',
        data: {
            email:email,
            password:password,
        },
        success:function(res) {  console.log(res);
            if(res.status === "success") {
                console.log('login success');
                localStorage.setItem('access_token', res.access_token)
                window.location.href = "http://localhost:88/countries/index";
            }
        },
        error:function (res) {
            console.log(res);
        }
    });
});
