$(document).ready(function(){

    $('#puestos').on('click',function(){

        event.preventDefault()
        let isValidate = true;
        const descripcion = $('#descripcion');
     
         
        if (descripcion.val()==""||descripcion.val()==null|| descripcion.val()== undefined ){
            descripcion.addClass('border-danger');
            descripcion.focus();
            isValidate = false;
        }
        else{
            descripcion.removeClass('border-danger');

        }

        if(isValidate){ 
            $('#puestos').parents().submit()
        }
    });

});