// Pass csrf token in ajax header

$(document).ready(function() {

});

$('#country_id').click(function() {
    let nid = $(this).val();
    if(nid){
        $.ajax({
            type:"get",
            url: 'http://localhost:88/api/professions/index',
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
        url: 'http://localhost:88/api/professions/index',
        success: function(res) {
            let data = ""
            $.each(res.data, function(key, value) {
                data = data + "<tr class="+value.id+" id="+value.id+"'>"
                data = data + "<td>"+value.id+"</td>"
                data = data + "<td>"+value.name+"</td>"
                // data = data + "<td data-id="+value.country.id+">"+value.country.name+"</td>"
                data = data + "<td>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-warning' onclick='showProfession("+value.id+")'>Show</button>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-primary' onclick='editProfession("+value.id+")'>Edit</button>"
                data = data + "<button data-id="+value.id+" class='btn btn-sm me-2 btn-danger' onclick='deleteProfession("+value.id+")'>Delete</button>"
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

$("#addProfessionModal").on('hidden.bs.modal', function () {
    $(".error").remove();
    $('#addProfessionModal #professionForm')[0].reset();
    $('#country_id').prop('selectedIndex',0);
});


$("#addSuccessModal").on('hidden.bs.modal', function () {
    location.reload();
});

// ---------- [ Show city ] ----------------

function showProfession(id) {
    $.ajax({
        url: 'http://localhost:88/api/professions/show/'+id,
        method: 'GET',
        dataType: 'json',

        success:function(res) {
            if(res.status === "success") {
                $('#showProfessionModal').find('#professionId').text("Id: " +res.data.id);
                $('#showProfessionModal').find('#professionName').text("Profession: " +res.data.name);
                $('#showProfessionModal').modal('show');
            } else if(res.status === "failed") {
                $("#result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message + "</div>");
            }
        }
    });
}

// create new Profession
function createProfession(event) {
    event.preventDefault();
    $(".error").remove();
    $(".alert").remove();
    $(".result").remove();

    let name = $("#name").val();
    // let country = $( "#country_id" ).val();

    if(name === "") {
        $("#name").after('<span class="text-danger error"> Name is required </span>');
        return;
    }

    let data = $("#professionForm").serialize();


    $.ajax({
        url: 'http://localhost:88/api/professions/create',
        method: 'POST',
        data: data,
        dataType: 'json',

        beforeSend:function() {
            $("#addProfessionModal  #createProfessionBtn").addClass("disabled");
            $("#addProfessionModal  #createProfessionBtn").text("Processing...");
        },

        success:function(res) {
            $("#addProfessionModal  #createProfessionBtn").removeClass("disabled");
            $("#addProfessionModal  #createProfessionBtn").text("Save");

            if(res.status === "success") { console.log(res);
                $("#addProfessionModal").modal('hide');
                let data = ""
                data = data + "<tr class="+res.data.id+" id="+res.data.id+"'>"
                data = data + "<td>"+res.data.id+"</td>"
                data = data + "<td>"+res.data.name+"</td>"
                data = data + "<td>"
                data = data + "<button  class='btn btn-sm me-2 btn-warning' onclick='showProfession("+res.data.id+")'>Show</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-primary' onclick='editProfession("+res.data.id+")'>Edit</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-danger'  onclick='deleteProfession("+res.data.id+")'>Delete</button>"
                data = data + "</td>"
                data = data + "</tr>"

                $("#table > tbody").append(data);
                $(".result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message+ "</div>");
            } else if(res.status ==="failed") {
                $(".result").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message+ "</div>");
            }    $('#professionForm')[0].reset();
        },
        error: function (data) {
            console.log(data);
        }
    });
}

// edit Profession
function editProfession(id) {
    let tr = document.getElementsByClassName(id)[0];
    let td = tr.getElementsByTagName("td")[1];
    let professionName = td.innerText;

    $("#editProfessionModal #professionName").val(professionName);
    $("#editProfessionModal #professionId").val(id);
    $('#editProfessionModal').modal('show');
}

// update Profession
function updateProfession() {
    $(".error").remove();
    $(".alert").remove();
    $(".result").remove();

    let id = $('#editProfessionModal #professionId').val();
    let professionName = $("#editProfessionModal #professionName").val();

    if(professionName === "") {
        $("#editProfessionModal #professionName").after('<span class="text-danger error"> Name is required </span>');
        return;
    }

    $.ajax({
        url: 'http://localhost:88/api/professions/edit/'+id,
        method: 'PUT',
        data: {name:professionName},
        dataType: 'json',

        beforeSend:function() {
            $("#editProfessionModal #updateProfessionBtn").addClass("disabled");
            $("#editProfessionModal #updateProfessionBtn").text("Processing...");
        },

        success:function(res) {
            $("#editProfessionModal #updateProfessionBtn").removeClass("disabled");
            $("#editProfessionModal #updateProfessionBtn").text("Save");

            if(res.status === "success") {
                $("#editProfessionModal").modal('hide');
                let data = ''
                data = data + "<tr class="+res.data.id+" id="+res.data.id+"'>"
                data = data + "<td>"+res.data.id+"</td>"
                data = data + "<td>"+res.data.name+"</td>"
                data = data + "<td>"
                data = data + "<button  class='btn btn-sm me-2 btn-warning' onclick='showProfession("+res.data.id+")'>Show</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-primary' onclick='editProfession("+res.data.id+")'>Edit</button>"
                data = data + "<button  class='btn btn-sm me-2 btn-danger' onclick='deleteProfession("+res.data.id+")'>Delete</button>"
                data = data + "</td>"
                data = data + "</tr>";

                document.getElementsByClassName(id)[0].innerHTML = data;

            } else if(res.status === "failed") {
                $("#result").html("<div class='alert alert-success alert-dismissible'><button type='button' class='close' data-dismiss='alert'>×</button>" + res.message + "</div>");
            }
        }
    });
}

// ---------- [ Delete Profession ] ----------------
function deleteProfession(id) {
    let status = confirm("Do you want to delete this Profession?");
    if(status === true) {
        $.ajax({
            url: 'http://localhost:88/api/professions/delete/'+id,
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
