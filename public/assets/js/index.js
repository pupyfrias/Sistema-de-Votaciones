$(document).ready(function () {


    $(".eliminar").on("click", function () {

        event.preventDefault();
        const nombre = $(this).data("nombre");
        const confirmacion = confirm(`Seguro que deseas eliminar ${nombre}`);

        if (confirmacion) {

            $(`button[data-nombre="${nombre}"]`).parents().submit();
        }
    })


    $(".radio").on("click", function () {

        $('input[name="votar"]').parents().removeClass("border-primary");
        $('input[name="votar"]:checked').parents().addClass("border-primary");

    })


    $(".editar").on('click',function(){

        const data = $(this).data("eleccion");
  
        if (data) {
            event.preventDefault();
            alert('No se puede agregar o modificar datos mientras haya una Elección en curso')   
        }
    })

    $('#iniciarEleccion').on('click',function(){

        
        const cedula = $('#cedulaIndex').val();
        if(cedula==""||cedula==null||cedula==undefined){

            event.preventDefault()
            $('#cedulaIndex').addClass('border-danger');
        }
    })

    $('#siguiente').on('click',function(){

        event.preventDefault();
        let votar = $('input[name=datosCandidato]:checked').val()
        
        if (votar != undefined){
            $('#siguiente').prop('disabled')
            $('#siguiente').parents().submit()
        }
        

    });

});







