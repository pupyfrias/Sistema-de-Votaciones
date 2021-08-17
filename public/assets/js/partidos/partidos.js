$(document).ready(function(){

    $('#partidos').on('click',function(){

        event.preventDefault()
        let isValidate = true;
        const nombre = $('#nombre');
        const descripcion = $('#descripcion');
        const logo = $('#logo');
        

        if (logo.val()=="" && logo.data('logo')=="normal"||logo.val()==null|| logo.val()== undefined ){
            logo.addClass('border-danger');
            logo.focus();
            isValidate = false;
        }
        else{
            logo.removeClass('border-danger');

        }
        if (descripcion.val()==""||descripcion.val()==null|| descripcion.val()== undefined ){
            descripcion.addClass('border-danger');
            descripcion.focus();
            isValidate = false;
        }
        else{
            descripcion.removeClass('border-danger');

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
            $('#partidos').parents().submit()
        }
    });

});