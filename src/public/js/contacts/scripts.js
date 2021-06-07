// Pass csrf token in ajax header

$('#addContactModal #agency_id').click(function() {
    let nid = $(this).val();
    if(nid){
        $.ajax({
            type:"get",
            url: 'http://localhost:88/api/agencies/index',
            success:function(res) {
                if(res.status === "success") {
                    $("#agency_id").empty();
                    $("#agency_id").append('<option value="0">-- Select Agency --</option>');
                    $.each(res.data, function(key, value) {
                        $("#agency_id").append('<option value="'+value.id+'">'+value.name+'</option>');
                    })
                }
            }

        });
    }
});
$('#editCityModal #country_id').click(function() {
    let nid = $(this).val();
    if(nid){
        $.ajax({
            type:"get",
            url: 'http://localhost:88/api/countries/index',
            success:function(res) {
                if(res.status === "success") {
                    $("#editCityModal #country_id").empty();
                    $("#editCityModal #country_id").append('<option value="0">-- Select Country --</option>');
                    $.each(res.data, function(key, value) {
                        $("#editCityModal #country_id").append('<option value="'+value.id+'">'+value.name+'</option>');
                    })
                }
            }

        });
    }
});
function allData() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'http://localhost:88/api/contacts/index',
        success: function(res) {
            let data = ""
            $.each(res.data, function(key, value) {console.log(value)
                data = data + "<tr class="+value.id+" id="+value.id+"'>"
                data = data + "<td>"+value.id+"</td>"
                data = data + "<td>"+value.first_name+"</td>"
                data = data + "<td>"+value.last_name+"</td>"
                data = data + "<td>"+value.email+"</td>"
                data = data + "<td>"+value.web+"</td>"
                data = data + "<td>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-warning' onclick='showContact("+value.id+")'>Show</button>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-primary' onclick='editContact("+value.id+")'>Edit</button>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-danger' onclick='deleteContact("+value.id+")'>Delete</button>"
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

$("#addContactModal").on('hidden.bs.modal', function () {
    $(".error").remove();
    $('#cityForm')[0].reset();
    $('#country_id').prop('selectedIndex',0);
});


$("#addSuccessModal").on('hidden.bs.modal', function () {
    location.reload();
});
$("#showContactModal").on('hidden.bs.modal', function () {
    let path =  $('#showContactModal').find('#image_preview_container');
    $('#showContactModal').find('#image_preview_container').attr('src',  '/images');
});
// ---------- [ Show Contact ] ----------------

function showContact(id) {
    $.ajax({
        url: 'http://localhost:88/api/contacts/show/'+id,
        method: 'GET',
        dataType: 'json',

        success:function(res) {
            if(res.status === "success") {
                $('#showContactModal').find('#contactId').text("Id: " +res.data.id);
                $('#showContactModal').find('#contactFirstName').text("First Name: " +res.data.first_name);
                $('#showContactModal').find('#contactLastName').text("Last Name: " +res.data.last_name);
                $('#showContactModal').find('#contactPhone').text("Phone: " +res.data.phone);
                $('#showContactModal').find('#contactEmail').text("Email: " +res.data.email);
                $('#showContactModal').find('#contactWeb').text("Web: " +res.data.web);
                $('#showContactModal').find('#contactAvatar').text("Avatar: " +res.data.avatar);
                let path =  $('#showContactModal').find('#image_preview_container');
                $('#showContactModal').find('#image_preview_container').attr('src', path.attr('src')+'/'+(res.data.avatar));
                $('#showContactModal').modal('show');
            } else if(res.status === "failed") {
                $("#result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message + "</div>");
            }
        }
    });
}

$('#avatar').change(function() {

    let reader = new FileReader();

    reader.onload = (e) => {

        $('#image_preview_container').attr('src', e.target.result);
    }

    reader.readAsDataURL(this.files[0]);

    let photo = $(this)[0].files[0];
    let formData = new FormData();

    formData.append('avatar', photo);
    window.data=formData;

});

$('#contactForm').on('submit',(function(e) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    e.preventDefault();
    $(".error").remove();
    $(".alert").remove();
    $(".result").remove();
    let firstName = $("#first_name").val();
    let flastName = $("#last_name").val();
    let agency = $("#agency_id").val();
    let phone = $("#phone").val();

    if(firstName === "") {
        $("#first_name").after('<span class="text-danger error"> First Name is required </span>');
        return;
    }
    if(flastName === "") {
        $("#last_name").after('<span class="text-danger error"> Last Name is required </span>');
        return;
    }
    if(agency == 0) {
        $("#agency_id").after('<span class="text-danger error">Agency is required </span>');
        return;
    }
    if(phone === "") {
        $("#phone").after('<span class="text-danger error"> Phone is required </span>');
        return;
    }

    var formData = new FormData(this);


    $.ajax({
        url: 'http://localhost:88/api/contacts/create',
        method: 'POST',
        data:formData,
        cache:false,
        contentType: false,
        processData: false,

        beforeSend:function() {
            $("#createContactBtn").addClass("disabled");
            $("#createContactBtn").text("Processing...");
        },

        success:function(res) {
            $("#createContactBtn").removeClass("disabled");
            $("#createContactBtn").text("Save");

            if(res.status === "success") { console.log(res)
                $("#addContactModal").modal('hide');
                let data = ""
                data = data + "<tr class="+res.data.id+" id="+res.data.id+"'>"
                data = data + "<td>"+res.data.id+"</td>"
                data = data + "<td>"+res.data.name+"</td>"
                // data = data + "<td>"+res.data.country.name+"</td>"
                data = data + "<td data-id="+data.country.id+">"+data.country.name+"</td>"
                data = data + "<td>"
                data = data + "<button  class='btn btn-sm me-2 btn-warning' onclick='showContact("+res.data.id+")'>Show</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-primary' onclick='editContact("+res.data.id+")'>Edit</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-danger'  onclick='deleteContact("+res.data.id+")'>Delete</button>"
                data = data + "</td>"
                data = data + "</tr>"

                $("#table > tbody").append(data);
                $(".result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message+ "</div>");
            } else if(res.status ==="failed") {
                $(".result").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message+ "</div>");
            }    $('#contactForm')[0].reset();
        },
        error: function (data) {
            console.log(data);
        }
    });
}));
// create new Contact
function createContact(event) {    var formData = new FormData(event);
    console.log(formData);
    event.preventDefault();
    $(".error").remove();
    $(".alert").remove();
    $(".result").remove();
    $('#editContactModal .songs').select2();
    let name = $("#name").val();
    let country = $( "#country_id" ).val();
    let contactAvatar = $( "#avatar" ).val();
    var form = $('#contactForm')[0];
    var formData = new FormData(form);
    if(name === "") {
        $("#name").after('<span class="text-danger error"> Name is required </span>');
        return;
    }
    console.log(contactAvatar)

    let data = $("#contactForm").serialize();


    $.ajax({
        url: 'http://localhost:88/api/contacts/create',
        method: 'POST',
        data: data,
        dataType: 'json',

        beforeSend:function() {
            $("#createContactBtn").addClass("disabled");
            $("#createContactBtn").text("Processing...");
        },

        success:function(res) {
            $("#createContactBtn").removeClass("disabled");
            $("#createContactBtn").text("Save");

            if(res.status === "success") { console.log(res)
                $("#addContactModal").modal('hide');
                let data = ""
                data = data + "<tr class="+res.data.id+" id="+res.data.id+"'>"
                data = data + "<td>"+res.data.id+"</td>"
                data = data + "<td>"+res.data.name+"</td>"
                // data = data + "<td>"+res.data.country.name+"</td>"
                data = data + "<td data-id="+data.country.id+">"+data.country.name+"</td>"
                data = data + "<td>"
                data = data + "<button  class='btn btn-sm me-2 btn-warning' onclick='showCity("+res.data.id+")'>Show</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-primary' onclick='editCity("+res.data.id+")'>Edit</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-danger'  onclick='deleteCity("+res.data.id+")'>Delete</button>"
                data = data + "</td>"
                data = data + "</tr>"

                $("#table > tbody").append(data);
                $(".result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message+ "</div>");
            } else if(res.status ==="failed") {
                $(".result").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message+ "</div>");
            }    $('#cityForm')[0].reset();
        },
        error: function (data) {
            console.log(data);
        }
    });
}

// edit Contact
function editContact(id) {
    let tr = document.getElementsByClassName(id)[0];
    let td = tr.getElementsByTagName("td")[1];
    let cityName = td.innerText;
    let countryId = (tr.getElementsByTagName("td")[2]).getAttribute("data-id");
    let countryName = (tr.getElementsByTagName("td")[2]).innerText;
    $('#editCityModal #country_id').val('23');
    $("#editCityModal #country_id").append('<option value="'+countryId+'" selected="selected">'+countryName+'</option>');
    $("#editCityModal #cityName").val(cityName);
    $("#editCityModal #cityId").val(id);
    $('#editCityModal').modal('show');
}

// update Contact
function updateContact() {
    $(".error").remove();
    $(".alert").remove();
    $(".result").remove();

    let id = $('#editContactModal #cityId').val();
    let cityName = $("#editContactModal #cityName").val();
    let countryId = $('#editContactModal #country_id').val(); console.log($('#editContactModal #country_id').val())
    if(cityName === "") {
        $("#editContactModal #cityName").after('<span class="text-danger error"> Name is required </span>');
        return;
    }

    if(countryId == 0) {
        $("#editContactModal #country_id").after('<span class="text-danger error"> Contact is required </span>');
        return;
    }

    $.ajax({
        url: 'http://localhost:88/api/contacts/edit/'+id,
        method: 'PUT',
        data: {name:cityName, country_id:countryId},
        dataType: 'json',

        beforeSend:function() {
            $("#updateContactBtn").addClass("disabled");
            $("#updateContactBtn").text("Processing...");
        },

        success:function(res) {
            $("#updateContactBtn").removeClass("disabled");
            $("#updateContactBtn").text("Save");

            if(res.status === "success") {
                $("#editContactModal").modal('hide');
                let data = ''
                data = data + "<tr class="+res.data.id+" id="+res.data.id+"'>"
                data = data + "<td>"+res.data.id+"</td>"
                data = data + "<td>"+res.data.name+"</td>"
                data = data + "<td data-id="+res.data.country.id+">"+res.data.country.name+"</td>"
                data = data + "<td>"
                data = data + "<button  class='btn btn-sm me-2 btn-warning' onclick='showCity("+res.data.id+")'>Show</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-primary' onclick='editCity("+res.data.id+")'>Edit</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-danger' onclick='deleteCity("+res.data.id+")'>Delete</button>"
                data = data + "</td>"
                data = data + "</tr>";

                document.getElementsByClassName(id)[0].innerHTML = data;

            } else if(res.status === "failed") {
                $("#result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message + "</div>");
            }
        }
    });
}

// ---------- [ Delete Contact ] ----------------
function deleteContact(id) {
    let status = confirm("Do you want to delete this Contact?");
    if(status === true) {
        $.ajax({
            url: 'http://localhost:88/api/contacts/delete/'+id,
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
