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

    $('#admin-iniciar').on('click',function(){

        
        const usuario = $('#usuario');
        const contraseña = $('#contraseña');

        isVatidate =true;
        event.preventDefault()

        if(contraseña.val()==""||contraseña.val()==null||contraseña.val()==undefined){

            $(contraseña).addClass('border-danger');
            contraseña.focus()
            isVatidate = false
        }
        else{
            $(contraseña).removeClass('border-danger');
        }
        
        if(usuario.val()==""||usuario.val()==null||usuario.val()==undefined){

            $(usuario).addClass('border-danger');
            usuario.focus()
            isVatidate = false
        }
        else{
            $(usuario).removeClass('border-danger');
        }

        
    
    
        if(isVatidate){
            $('#admin-iniciar').parents().submit();
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







