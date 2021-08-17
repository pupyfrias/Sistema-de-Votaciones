


//GET
exports.GetIndex = (req, res, next) => {

    console.log(req.session.userId)
    console.log(req.session.Id)
    console.log("")
    
    if(req.session.isLoggedIn){
       return res.redirect('/admin/home');
    }
    if(req.session.userId){

        return res.redirect('/eleccion')
    }
    res.render("auth/index",{
        pageTitle: "Sistema de Elecciones",
        activeHome: true,
        activeE: true        
    })
}


exports.GetAdmin = (req, res, next) => {

    res.render("auth/admin", {
        pageTitle: "Iniciar Sesión",
        activeAdmin: true,
        iniciarSesionAdmin: true
    })
};

//POST

exports.PostAdminAuth = (req, res, next) => {
    
    req.session.isLoggedIn = true;
    res.redirect('/admin/home')
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