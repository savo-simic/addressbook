// Pass csrf token in ajax header
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function allData() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'http://localhost:88/api/countries/index',
        headers: {
            // "Authorization":  'Bearer ' +  localStorage.getItem('access_token'),
            'Accept': 'application/json',
        },
        success: function(response) {       console.log( localStorage.getItem('access_token'));
            let data = ""
            $.each(response.data, function(key, value) {
                data = data + "<tr class="+value.id+" id="+value.id+"'>"
                data = data + "<td>"+value.id+"</td>"
                data = data + "<td>"+value.name+"</td>"
                data = data + "<td>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-warning' onclick='showCountry("+value.id+")'>Show</button>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-primary' onclick='editCountry("+value.id+")'>Edit</button>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-danger' onclick='deleteCountry("+value.id+")'>Delete</button>"
                data = data + "</td>"
                data = data + "</tr>"
            })
            $('tbody').html(data);
        }
    })
}
allData();



$("#addCountryModal").on('hidden.bs.modal', function () {
    $(".error").remove();
});


$("#addSuccessModal").on('hidden.bs.modal', function () {
    location.reload();
});

// // ---------- [ Show country ] ----------------
function showCountry(id) {
    $.ajax({
        url: 'http://localhost:88/api/countries/show/'+id,
        method: 'GET',
        dataType: 'json',

        success:function(res) {
            if(res.status === "success") {
                $('#showCountryModal').find('#countryId').text("Id: " +res.data.id);
                $('#showCountryModal').find('#countryName').text("Name: " +res.data.name);
                $('#showCountryModal').modal('show');
            } else if(res.status === "failed") {
                $("#result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message + "</div>");
            }
        }
    });
}

// create new country
function createCountry(event) {
    event.preventDefault();
    $(".error").remove();
    $(".alert").remove();
    $(".result").remove();

    let name = $("#name").val();

    if(name === "") {
        $("#name").after('<span class="text-danger error"> Name is required </span>');
        return;
    }

    let data = $("#countryForm").serialize();

    $.ajax({
        url: 'http://localhost:88/api/countries/create',
        method: 'POST',
        data: data,
        dataType: 'json',
        headers: {
            // "Authorization":  'Bearer ' +  localStorage.getItem('access_token'),
            'Accept': 'application/json',
        },
        beforeSend:function() {
            $("#createCountryBtn").addClass("disabled");
            $("#createCountryBtn").text("Processing...");
        },

        success:function(res) {
            $("#createCountryBtn").removeClass("disabled");
            $("#createCountryBtn").text("Save");

            if(res.status === "success") {
                $("#addCountryModal").modal('hide');
                let data = ""
                data = data + "<tr class="+res.data.id+" id="+res.data.id+"'>"
                data = data + "<td>"+res.data.id+"</td>"
                data = data + "<td>"+res.data.name+"</td>"
                data = data + "<td>"
                data = data + "<button  class='btn btn-sm me-2 btn-warning' onclick='showCountry("+res.data.id+")'>Show</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-primary' onclick='editCountry("+res.data.id+")'>Edit</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-danger' onclick='deleteCountry("+res.data.id+")'>Delete</button>"
                data = data + "</td>"
                data = data + "</tr>"

                $("#table > tbody").append(data);
                $(".result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message+ "</div>");
            } else if(res.status ==="failed") {
                $(".result").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message+ "</div>");
            }    $('#countryForm')[0].reset();
        },
        error: function (data) {
            console.log(data);
        }
    });
}

// edit country
function editCountry(id) {
    let tr = document.getElementsByClassName(id)[0];
    let td = tr.getElementsByTagName("td")[1];
    let countryName = td.innerText;

    $("#editCountryModal #countryName").val(countryName);
    $("#editCountryModal #countryId").val(id);
    $('#editCountryModal').modal('show');
}

// update country
function updateCountry() {
    $(".error").remove();
    $(".alert").remove();
    $(".result").remove();

    let id = $('#editCountryModal #countryId').val();
    let countryName = $("#editCountryModal #countryName").val();

    if(countryName === "") {
        $("#editCountryModal #countryName").after('<span class="text-danger error"> Name is required </span>');
        return;
    }

    $.ajax({
        url: 'http://localhost:88/api/countries/edit/'+id,
        method: 'PUT',
        data: {name:countryName},
        dataType: 'json',

        beforeSend:function() {
            $("#updateCountryBtn").addClass("disabled");
            $("#updateCountryBtn").text("Processing...");
        },

        success:function(res) {
            $("#updateCountryBtn").removeClass("disabled");
            $("#updateCountryBtn").text("Save");

            if(res.status === "success") {
                $("#editCountryModal").modal('hide');
                let data = ''
                data = data + "<tr class="+res.data.id+" id="+res.data.id+"'>"
                data = data + "<td>"+res.data.id+"</td>"
                data = data + "<td>"+res.data.name+"</td>"
                data = data + "<td>"
                data = data + "<button  class='btn btn-sm me-2 btn-warning' onclick='showCountry("+res.data.id+")'>Show</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-primary' onclick='editCountry("+res.data.id+")'>Edit</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-danger' onclick='deleteCountry("+res.data.id+")'>Delete</button>"
                data = data + "</td>"
                data = data + "</tr>";

                document.getElementsByClassName(id)[0].innerHTML = data;

            } else if(res.status === "failed") {
                $("#result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message + "</div>");
            }
        }
    });
}

// ---------- [ Delete country ] ----------------
function deleteCountry(id) {
    let status = confirm("Do you want to delete this country?");
    if(status === true) {
        $.ajax({
            url: 'http://localhost:88/api/countries/delete/'+id,
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
