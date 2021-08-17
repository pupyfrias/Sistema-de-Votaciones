$(document).ready(function(){

    
 
    const nombre = $('#nombre');
    const apellido = $('#apellido');
    const partido = $('#partido');
    const puesto = $('#puesto');
    const logo = $('#logo');
    const estado = $('#estado');

  
    const puestoVal = puesto.val();
    const partidoVal = puesto.val();

    let disabledPartido = false;
    let disabledPuesto = false;

    if($('#partido').data('disabled')){

        $('#estado').attr('disabled','true')
        disabledPartido = true
    }

    if($('#puesto').data('disabled')){

        $('#estado').attr('disabled','true')
        disabledPuesto = true
    }

    $('#puesto').on('change',function(){
        if(disabledPuesto){
            if(puestoVal !== puesto.val()){
                if(disabledPartido==false){
                    $('#estado').removeAttr('disabled')
                }
                else{
                    disabledPuesto = false;
                }
            }
            else{
                $('#estado').attr('disabled','true')                
            }             
        }  
    }); 
    $('#partido').on('change',function(){
        if(disabledPartido){
            if(partidoVal !== partido.val()){
                if(disabledPuesto==false){
                    $('#estado').removeAttr('disabled')
                }
                else{
                    disabledPartido = false;
                }
            }
            else{
                $('#estado').attr('disabled','true')                
            }             
        }  
    });        
        


    $('#candidatos').on('click',function(){

        let isValidate = true;
        event.preventDefault()
        
        if (logo.val()=="" && logo.data('logo')=="normal"||logo.val()==null|| logo.val()== undefined ){
            logo.addClass('border-danger');
            logo.focus();
            isValidate = false;
        }
        else{
            logo.removeClass('border-danger');

        }
        if (puesto.val()=="Seleccine una opción"||puesto.val()==null|| puesto.val()== undefined ){
            puesto.addClass('border-danger');
            puesto.focus();
            isValidate = false;
        }
        else{
            puesto.removeClass('border-danger');

        } 
        
        if (partido.val()=="Seleccine una opción"||partido.val()==null|| partido.val()== undefined ){
            partido.addClass('border-danger');
            partido.focus();
            isValidate = false;
        }
        else{
            partido.removeClass('border-danger');

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

        if(isValidate){ 
            $('#candidatos').parents().submit()
        }
    });

});