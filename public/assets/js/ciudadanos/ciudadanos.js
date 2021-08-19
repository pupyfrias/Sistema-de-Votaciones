$(document).ready(function(){

    $('#ciudadanos').on('click',function(){

        event.preventDefault()
        let isValidate = true;
        const nombre = $('#nombre');
        const apellido = $('#apellido');
        const correo = $('#correo');
        const cedula = $('#cedula');
        const logo = $('#logo');
        

                                               
        
        if (correo.val()==""||correo.val()==null|| correo.val()== undefined || correo.val().includes('@')==false){
            correo.addClass('border-danger');
            correo.focus();
            isValidate = false;
        }
        else{
            correo.removeClass('border-danger');

        }
      
        if (apellido.val()==""||apellido.val()==null|| apellido.val()== undefined ){
            apellido.addClass('border-danger');
            apellido.focus();
            isValidate = false;
        }
        else{
            apellido.removeClass('border-danger');

        }

        if (nombre.val()==""||nombre.val()==null|| nombre.val()== undefined ){
            nombre.addClass('border-danger');
            nombre.focus();
            isValidate = false;
        }
        else{
            nombre.removeClass('border-danger');

        }

        if (cedula.val()==""||cedula.val()==null|| cedula.val()== undefined ){
            cedula.addClass('border-danger');
            cedula.focus();
            isValidate = false;
        }
        else{
            cedula.removeClass('border-danger');

        } 

        if(isValidate){ 
            $('#ciudadanos').parents().submit()
        }
    });

});