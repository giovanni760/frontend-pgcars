//var url = "http://localhost:8080/api/car";
var url = "https://pg-autos.onrender.com/api/car";

function postCar() {

    console.log(url);

    var carMatricula = $('#matricula').val();
    var carModelo = $('#modelo').val();
    var carMarca = $('#marca').val();
    var carAge = $('#age').val();
    var carColor = $('#color').val();
    var carCilindros = $('#cilindros').val();
    

    var mycar = {
        matricula: carMatricula,
        modelo: carModelo,
        marca: carMarca,
        age: carAge,
        color: carColor,
        cilindros: carCilindros,
        
    };
    console.log(mycar);

    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            limpiarInputs()
            $('#resultado').html(`
                <div class="mensaje-exito">car creado correctamente</div>
            `);
        },
        data: JSON.stringify(mycar)
    });
}

function editarCar(id) {
    $.getJSON(url + '/' + id, function (data) {
        const car = data.car;

        if (car) {
            $('#matricula').val(car.matricula);
            $('#modelo').val(car.modelo);
            $('#marca').val(car.marca);
            $('#age').val(car.age);
            $('#color').val(car.color);
            $('#cilindros').val(car.cilindros);
           

            $('#btn-update').show().data('id', id);
            $('#resultado').html("");
        } else {
            alert('car no encontrado.');
        }
    });
}
function getById() {
    const id = $('#id').val();
    $.getJSON(url + '/' + id, function (data) {
        const car = data.car;

        if (car) {
            var htmlTableCars = '<table border="1">' +
                '<tr><th>ID</th><th>Matrícula</th><th>Modelo</th><th>Marca</th><th>Año</th><th>Color</th><th>Cilindros</th><th>Acciones</th></tr>';
            htmlTableCars += '<tr>' +
                '<td>' + car.id + '</td>' +
                '<td>' + car.matricula + '</td>' +
                '<td>' + car.modelo + '</td>' +
                '<td>' + car.marca + '</td>' +
                '<td>' + car.age + '</td>' +
                '<td>' + car.color + '</td>' +
                '<td>' + car.cilindros + '</td>' +
                '<td>' +
                '<button onclick="editarCar(' + car.id + ')">Editar</button> ' +
                '<button onclick="deleteCar(' + car.id + ')">Eliminar</button>' +
                '</td>' +
                '</tr>';
            htmlTableCars += '</table>';
            $('#resultado').html(htmlTableCars);
        } else {
            alert('Car no encontrado.');
        }
    });
}

function updateCar() {
    const id = $('#btn-update').data('id');

    var mycar = {
        matricula: $('#matricula').val(),
        modelo: $('#modelo').val(),
        marca: $('#marca').val(),
        age: $('#age').val(),
        color: $('#color').val(),
        cilindros: $('#cilindros').val()
    };

    $.ajax({
        url: url + '/' + id,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(mycar),
        success: function (data) {
            alert('Car actualizado');
            $('#btn-update').hide();
            limpiarInputs();
            getCars();
        },
        error: function (err) {
            alert('Error al actualizar car');
            console.error(err);
        }
    });
}

function getCars() {
    console.log(url);

    $.getJSON(url, function (json) {
        console.log(json);

        var arrCars = json.cars;

        var htmlTableCars = '<table border="1">' +
            '<tr><th>ID</th><th>Matrícula</th><th>Modelo</th><th>Marca</th><th>Año</th><th>Color</th><th>Cilindros</th><th>Acciones</th></tr>';

        arrCars.forEach(function (item) {
            htmlTableCars += '<tr>' +
                '<td data-label="ID">' + item.id + '</td>' +
                '<td data-label="Matrícula">' + item.matricula + '</td>' +
                '<td data-label="Modelo">' + item.modelo + '</td>' +
                '<td data-label="Marca">' + item.marca + '</td>' +
                '<td data-label="Año">' + item.age + '</td>' +
                '<td data-label="Color">' + item.color + '</td>' +
                '<td data-label="Cilindros">' + item.cilindros + '</td>' +
                '<td data-label="Acciones">' +
                '<button onclick="editarCar(' + item.id + ')">Editar</button> ' +
                '<button onclick="deleteCar(' + item.id + ')">Eliminar</button>' +
                '</td>' +
                '</tr>';
        });

        htmlTableCars += '</table>';

        $('#resultado').html(htmlTableCars);
    });
}

function deleteCar(id) {
    if (!confirm("¿Estás seguro de eliminar el car " + id + "?")) return;

    $.ajax({
        url: url + '/' + id,
        type: 'DELETE',
        success: function (data) {
            alert('Car eliminado con éxito: ' + JSON.stringify(data));
            getCars();
        },
        error: function (err) {
            alert('Error al eliminar car');
            console.error(err);
        }
    });
}

function limpiarInputs() {
    $('#matricula').val('');
    $('#modelo').val('');
    $('#marca').val('');
    $('#age').val('');
    $('#color').val('');
    $('#cilindros').val('');
    $('#id').val('');
}


