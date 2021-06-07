// Pass csrf token in ajax header

$(document).ready(function() {

});

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
        url: 'http://localhost:88/api/cities/index',
        success: function(res) {
            let data = ""
            $.each(res.data, function(key, value) {
                data = data + "<tr class="+value.id+" id="+value.id+"'>"
                data = data + "<td>"+value.id+"</td>"
                data = data + "<td>"+value.name+"</td>"
                data = data + "<td data-id="+value.country.id+">"+value.country.name+"</td>"
                data = data + "<td>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-warning' onclick='showCity("+value.id+")'>Show</button>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-primary' onclick='editCity("+value.id+")'>Edit</button>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-danger' onclick='deleteCity("+value.id+")'>Delete</button>"
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

$("#addCityModal").on('hidden.bs.modal', function () {
    $(".error").remove();
    $('#cityForm')[0].reset();
    $('#country_id').prop('selectedIndex',0);
});


$("#addSuccessModal").on('hidden.bs.modal', function () {
    location.reload();
});

// ---------- [ Show city ] ----------------
function show2() {
    $('#showCityModal').find('#cityId').text("Id: " +res.data.id);
    $('#showCityModal').find('#cityName').text("Name: " +res.data.name);
    $('#showCityModal').modal('show');

    let id  = $(e).data("id");
    let todo  = $("#todo_"+id+" td:nth-child(2)").html();
    $("#todo_id").val(id);
    $("#edittask").val(todo);
    $('#editTodoModal').modal('show');
}

function showCity(id) {
    $.ajax({
        url: 'http://localhost:88/api/cities/show/'+id,
        method: 'GET',
        dataType: 'json',

        success:function(res) { console.log(res.data.country.name)
            if(res.status === "success") {
                $('#showCityModal').find('#countryId').text("Id: " +res.data.id);
                $('#showCityModal').find('#cityName').text("City: " +res.data.name);
                $('#showCityModal').find('#countryName').text("Country: " +res.data.country.name);
                $('#showCityModal').modal('show');
            } else if(res.status === "failed") {
                $("#result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message + "</div>");
            }
        }
    });
}

// create new city
function createCity(event) {
    event.preventDefault();
    $(".error").remove();
    $(".alert").remove();
    $(".result").remove();

    let name = $("#name").val();
    let country = $( "#country_id" ).val();

    if(name === "") {
        $("#name").after('<span class="text-danger error"> Name is required </span>');
        return;
    }

    if(country == 0) {
        $("#country_id").after('<span class="text-danger error"> Country is required </span>');
        return;
    }

    let data = $("#cityForm").serialize();


    $.ajax({
        url: 'http://localhost:88/api/cities/create',
        method: 'POST',
        data: data,
        dataType: 'json',

        beforeSend:function() {
            $("#createCityBtn").addClass("disabled");
            $("#createCityBtn").text("Processing...");
        },

        success:function(res) {
            $("#createCityBtn").removeClass("disabled");
            $("#createCityBtn").text("Save");

            if(res.status === "success") { console.log(res)
                $("#addCityModal").modal('hide');
                let data = ""
                data = data + "<tr class="+res.data.id+" id="+res.data.id+"'>"
                data = data + "<td>"+res.data.id+"</td>"
                data = data + "<td>"+res.data.name+"</td>"
                // data = data + "<td>"+res.data.country.name+"</td>"
                data = data + "<td data-id="+res.data.country.id+">"+res.data.country.name+"</td>"
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

// edit city
function editCity(id) {
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

// update city
function updateCity() {
    $(".error").remove();
    $(".alert").remove();
    $(".result").remove();

    let id = $('#editCityModal #cityId').val();
    let cityName = $("#editCityModal #cityName").val();
    let countryId = $('#editCityModal #country_id').val(); console.log($('#editCityModal #country_id').val())
    if(cityName === "") {
        $("#editCityModal #cityName").after('<span class="text-danger error"> Name is required </span>');
        return;
    }

    if(countryId == 0) {
        $("#editCityModal #country_id").after('<span class="text-danger error"> Country is required </span>');
        return;
    }

    $.ajax({
        url: 'http://localhost:88/api/cities/edit/'+id,
        method: 'PUT',
        data: {name:cityName, country_id:countryId},
        dataType: 'json',

        beforeSend:function() {
            $("#updateCityBtn").addClass("disabled");
            $("#updateCityBtn").text("Processing...");
        },

        success:function(res) {
            $("#updateCityBtn").removeClass("disabled");
            $("#updateCityBtn").text("Save");

            if(res.status === "success") {
                $("#editCityModal").modal('hide');
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

// ---------- [ Delete city ] ----------------
function deleteCity(id) {
    let status = confirm("Do you want to delete this city?");
    if(status === true) {
        $.ajax({
            url: 'http://localhost:88/api/cities/delete/'+id,
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
