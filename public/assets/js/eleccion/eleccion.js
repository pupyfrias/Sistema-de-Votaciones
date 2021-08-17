$(document).ready(function(){

    $('#btn-eleccion').on('click',function(){

        event.preventDefault()
        let isValidate = true;
        const nombre = $('#nombre');
        const fecha = $('#fecha');
     
        if (fecha.val()==""||fecha.val()==null|| fecha.val()== undefined ){
            fecha.addClass('border-danger');
            fecha.focus();
            isValidate = false;
        }
        else{
            fecha.removeClass('border-danger');

        }
        if (nombre.val()==""||nombre.val()==null|| nombre.val()== undefined ){
            nombre.addClass('border-danger');
            nombre.focus();
            isValidate = false;
        }
        else{
            nombre.removeClass('border-danger');

        }

          

        if(isValidate){ 
            $('#btn-eleccion').parents().submit()
        }
    });

});