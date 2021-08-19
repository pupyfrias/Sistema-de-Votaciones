//GET
exports.GetIndex = (req, res, next) => {

    
    if(req.session.isLoggedIn){
       return res.redirect('/admin/home');
    }
    if(req.session.userId){

        return res.redirect('/eleccion')
    }
    res.render("auth/index",{
        pageTitle: "Sistema de Elecciones",
        activeHome: true,
        activeE: true,
        csrfToken:req.csrfToken()     
    })
}


exports.GetAdmin = (req, res, next) => {

    if (req.session.isLoggedIn){

        return res.redirect('/admin/home')
    }
    else{
        res.render("auth/admin", {
            pageTitle: "Iniciar Sesión",
            activeAdmin: true,
            iniciarSesionAdmin: true,
            csrfToken:req.csrfToken()
        })

    }
    
};

//POST

exports.PostAdminAuth = (req, res, next) => {
    
    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;

    if(usuario!= "admin" && contraseña!="admin"){
        req.flash(
            "errors",
            "Usuario y Contraseña Incorrecto"
          );
        return res.redirect("/admin/iniciar-sesion");
    }
    else if(contraseña!="admin"){
        req.flash(
            "errors",
            "Contraseña Incorrecto"
          );
        return res.redirect("/admin/iniciar-sesion");
    }
    else if(usuario!= "admin"){

        req.flash(
            "errors",
            "Contraseña Incorrecto"
          );
        return res.redirect("/admin/iniciar-sesion");
    }
    else{

        req.session.isLoggedIn = true;
        return res.redirect('/admin/home') 
    }
   
};

exports.PostLogout = (req, res, next)=>{

    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/');
    })

}


exports.PostIndexAuth = (req, res, next) => {
    
    req.session.isLoggedIn = true;
    res.redirect('/eleccion')
};