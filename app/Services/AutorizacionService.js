const AccesoProhibidoException = use('App/Exceptions/AccesoProhibidoException')
class AutorizacionService{
    veficarPermiso(recurso,user){
        if(recurso.user_id !== user.id){
           throw new AccesoProhibidoException();
        }
    }
}
module.exports = new AutorizacionService();