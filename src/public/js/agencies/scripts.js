// Pass csrf token in ajax header

$('#country_id').click(function() {
    let nid = $(this).val();
    if(nid){
        $.ajax({
            type:"get",
            url: 'http://localhost:88/api/countries/index',
            success:function(res) {
                if(res.status === "success") {
                    $("#country_id").empty();
                    $("#country_id").append('<option value="0">-- Select Country --</option>');
                    $.each(res.data, function(key, value) {
                        $("#country_id").append('<option value="'+value.id+'">'+value.name+'</option>');
                    })
                }
            }

        });
    }
});


$('#addAgencyModal #country_id').change(function() {
    var countryID = $(this).val();
    if(countryID){console.log(countryID);
        $.ajax({
            type:"GET",
            url: 'http://localhost:88/api/countries/cities/'+countryID,
            success:function(res){
                if(res){
                    $("#addAgencyModal #city_id").empty();
                    $("#addAgencyModal #city_id").append('<option value="0">Select</option>');
                    $.each(res.data, function(key,value){key = parseInt(key)+1; console.log(key);
                        $("#addAgencyModal #city_id").append('<option value="'+key+'">'+value.name+'</option>');
                    });

                }else{
                    $("#addAgencyModal #city_id").empty();
                }
            }
        });
    }else{
        $("#state").empty();
        $("#city").empty();
    }
});
$('#country_id').click(function() { console.log('fff');
    let nid = $(this).val();
    if(nid){
        $.ajax({
            type:"get",
            url: 'http://localhost:88/api/countries/index',
            success:function(res) {
                if(res.status === "success") {
                    $("#country_id").empty();
                    $("#country_id").append('<option value="0">-- Select Country --</option>');
                    $.each(res.data, function(key, value) {
                        $("#country_id").append('<option value="'+value.id+'">'+value.name+'</option>');
                    })
                }
            }

        });
    }
});
$('#editAgencyModal #country_id').change(function() {console.log('fff');
    var countryID = $(this).val();
    if(countryID){console.log(countryID);
        $.ajax({
            type:"GET",
            url: 'http://localhost:88/api/countries/cities/'+countryID,
            success:function(res){
                if(res){
                    $("#editAgencyModal #city_id").empty();
                    $("#editAgencyModal #city_id").append('<option value="0">Select</option>');
                    $.each(res.data, function(key,value){key = parseInt(key)+1; console.log(key);
                        $("#editAgencyModal #city_id").append('<option value="'+key+'">'+value.name+'</option>');
                    });

                }else{
                    $("#editAgencyModal #city_id").empty();
                }
            }
        });
    }else{
        $("#state").empty();
        $("#city").empty();
    }
});
// $('#editAgencyModal #country_id').click(function() {
//     let nid = $(this).val();
//     if(nid){
//         $.ajax({
//             type:"get",
//             url: 'http://localhost:88/api/countries/index',
//             success:function(res) {
//                 if(res.status === "success") {
//                     $("#editAgencyModal #country_id").empty();
//                     $("#editAgencyModal #country_id").append('<option value="0">-- Select Country --</option>');
//                     $.each(res.data, function(key, value) {
//                         $("#editCityModal #country_id").append('<option value="'+value.id+'">'+value.name+'</option>');
//                     })
//                 }
//             }
//
//         });
//     }
// });
function allData() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'http://localhost:88/api/agencies/index',
        success: function(res) {
            let data = ""
            $.each(res.data, function(key, value) { console.log(value);
                data = data + "<tr class="+value.id+" id="+value.id+"'>"
                data = data + "<td>"+value.id+"</td>"
                data = data + "<td>"+value.name+"</td>"
                data = data + "<td>"+value.address+"</td>"
                data = data + "<td data-city-id="+value.city.id+" data-country-id="+value.city.country_id+">"+value.city.name+"</td>"
                data = data + "<td>"+value.phone+"</td>"
                data = data + "<td>"+value.email+"</td>"
                data = data + "<td>"+value.web+"</td>"
                data = data + "<td>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-warning' onclick='showAgency("+value.id+")'>Show</button>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-primary' onclick='editAgency("+value.id+")'>Edit</button>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-danger' onclick='deleteAgency("+value.id+")'>Delete</button>"
                data = data + "</td>"
                data = data + "</tr>"
            })
            $('tbody').html(data);
        }
    })
}
allData();

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$("#addAgencyModal").on('hidden.bs.modal', function () {
    $(".error").remove();
    $('#agencyForm')[0].reset();
    $('#country_id').prop('selectedIndex',0);
});


$("#addSuccessModal").on('hidden.bs.modal', function () {
    location.reload();
});

function showAgency(id) {
    $.ajax({
        url: 'http://localhost:88/api/agencies/show/'+id,
        method: 'GET',
        dataType: 'json',

        success:function(res) { console.log(res.data)
            if(res.status === "success") {
                $('#showAgencyModal').find('#agencyId').text("Id: " +res.data.id);
                $('#showAgencyModal').find('#agencyName').text("Name: " +res.data.name);
                $('#showAgencyModal').find('#agencyAddress').text("Address: " +res.data.address);
                $('#showAgencyModal').find('#agencyCity').text("City: " +res.data.city.name);
                $('#showAgencyModal').find('#agencyPhone').text("Phone: " +res.data.phone);
                $('#showAgencyModal').find('#agencyEmail').text("Email: " +res.data.email);
                $('#showAgencyModal').find('#agencyWeb').text("Web: " +res.data.web);
                $('#showAgencyModal').modal('show');
            } else if(res.status === "failed") {
                $("#result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message + "</div>");
            }
        }
    });
}

// create new Agency
function createAgency(event) {
    event.preventDefault();
    $(".error").remove();
    $(".alert").remove();
    $(".result").remove();

    let name = $("#name").val();
    let address = $("#address").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let web = $("#web").val();
    let countryId = $( "#country_id" ).val();
    let cityId = $( "#city_id" ).val();

    if(name === "") {
        $("#name").after('<span class="text-danger error"> Name is required </span>');
        return;
    }
    if(address === "") {
        $("#address").after('<span class="text-danger error"> Address is required </span>');
        return;
    }
    if(countryId == 0) {
        $("#country_id").after('<span class="text-danger error"> Country is required </span>');
        return;
    }
    if(cityId == 0) {
        $("#city_id").after('<span class="text-danger error"> City is required </span>');
        return;
    }
    if(phone === "") {
        $("#phone").after('<span class="text-danger error"> Phone is required </span>');
        return;
    }
    if(email === "") {
        $("#email").after('<span class="text-danger error"> Email is required </span>');
        return;
    }
    if(web === "") {
        $("#web").after('<span class="text-danger error"> Web is required </span>');
        return;
    }

    let data = $("#agencyForm").serialize();


    $.ajax({
        url: 'http://localhost:88/api/agencies/create',
        method: 'POST',
        data: data,
        dataType: 'json',

        beforeSend:function() {
            $("#createAgencyBtn").addClass("disabled");
            $("#createAgencyBtn").text("Processing...");
        },

        success:function(res) {
            $("#createAgencyBtn").removeClass("disabled");
            $("#createAgencyBtn").text("Save");

            if(res.status === "success") {
                $("#addAgencyModal").modal('hide');
                let data = ""
                data = data + "<tr class="+res.data.id+" id="+res.data.id+"'>"
                data = data + "<td>"+res.data.id+"</td>"
                data = data + "<td>"+res.data.name+"</td>"
                data = data + "<td>"+res.data.country.name+"</td>"
                data = data + "<td data-id="+data.country.id+">"+data.country.name+"</td>"
                data = data + "<td>"
                data = data + "<button  class='btn btn-sm me-2 btn-warning' onclick='showAgency("+res.data.id+")'>Show</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-primary' onclick='editAgency("+res.data.id+")'>Edit</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-danger'  onclick='deleteAgency("+res.data.id+")'>Delete</button>"
                data = data + "</td>"
                data = data + "</tr>"

                $("#table > tbody").append(data);
                $(".result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message+ "</div>");
            } else if(res.status ==="failed") {
                $(".result").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message+ "</div>");
            }    $('#agencyForm')[0].reset();
        },
        error: function (data) {
            console.log(data);
        }
    });
}

// edit Agency
function editAgency(id) {
    let tr = document.getElementsByClassName(id)[0];
    let td = tr.getElementsByTagName("td")[1];
    let agencyName = td.innerText;
    let cityId = (tr.getElementsByTagName("td")[3]).getAttribute("data-city-id");
    let countryId = (tr.getElementsByTagName("td")[3]).getAttribute("data-country-id");
    let cityName = (tr.getElementsByTagName("td")[3]).innerText;
    let agencyAddress = (tr.getElementsByTagName("td")[2]).innerText;
    let agencyPhone = (tr.getElementsByTagName("td")[4]).innerText;
    let agencyEmail = (tr.getElementsByTagName("td")[5]).innerText;
    let agencyWeb = (tr.getElementsByTagName("td")[6]).innerText;
    // $('#editAgencyModal #country_id').val('23');
    // $("#editAgencyModal #country_id").append('<option value="'+countryId+'" selected="selected">'+countryName+'</option>');
    $("#editAgencyModal #city_id").append('<option value="'+cityId+'" selected="selected">'+cityName+'</option>');
    $("#editAgencyModal #agencyName").val(agencyName);
    $("#editAgencyModal #agencyAddress").val(agencyAddress);
    $("#editAgencyModal #agencyPhone").val(agencyPhone);
    $("#editAgencyModal #agencyEmail").val(agencyEmail);
    $("#editAgencyModal #agencyWeb").val(agencyWeb);
    $("#editAgencyModal #cityId").val(id);
    $('#editAgencyModal').modal('show');
}

// update Agency
function updateAgency() {
    $(".error").remove();
    $(".alert").remove();
    $(".result").remove();

    let id = $('#editAgencyModal #cityId').val();
    let cityName = $("#editAgencyModal #cityName").val();
    let countryId = $('#editAgencyModal #country_id').val();
    if(cityName === "") {
        $("#editAgencyModal #cityName").after('<span class="text-danger error"> Name is required </span>');
        return;
    }

    if(countryId == 0) {
        $("#editAgencyModal #country_id").after('<span class="text-danger error"> Country is required </span>');
        return;
    }

    $.ajax({
        url: 'http://localhost:88/api/agencies/edit/'+id,
        method: 'PUT',
        data: {name:cityName, country_id:countryId},
        dataType: 'json',

        beforeSend:function() {
            $("#updateAgencyBtn").addClass("disabled");
            $("#updateAgencyBtn").text("Processing...");
        },

        success:function(res) {
            $("#updateAgencyBtn").removeClass("disabled");
            $("#updateAgencyBtn").text("Save");

            if(res.status === "success") {
                $("#editAgencyModal").modal('hide');
                let data = ''
                data = data + "<tr class="+res.data.id+" id="+res.data.id+"'>"
                data = data + "<td>"+res.data.id+"</td>"
                data = data + "<td>"+res.data.name+"</td>"
                data = data + "<td data-id="+res.data.country.id+">"+res.data.country.name+"</td>"
                data = data + "<td>"
                data = data + "<button  class='btn btn-sm me-2 btn-warning' onclick='showAgency("+res.data.id+")'>Show</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-primary' onclick='editAgency("+res.data.id+")'>Edit</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-danger' onclick='deleteAgency("+res.data.id+")'>Delete</button>"
                data = data + "</td>"
                data = data + "</tr>";

                document.getElementsByClassName(id)[0].innerHTML = data;

            } else if(res.status === "failed") {
                $("#result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message + "</div>");
            }
        }
    });
}

// ---------- [ Delete Agency ] ----------------
function deleteAgency(id) {
    let status = confirm("Do you want to delete this Agency?");
    if(status === true) {
        $.ajax({
            url: 'http://localhost:88/api/agencies/delete/'+id,
            method: 'delete',
            dataType: 'json',

            success:function(res) {
                if(res.status === "success") {
                    $('#addSuccessModal').modal('show');
                    $('#table').data.reload();
                } else if(res.status === "failed") {
                    $("#result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message + "</div>");
                }
            }
        });
    }
}
