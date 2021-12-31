'use strict'

const Tarea = use('App/Models/Tarea')
const Proyecto= use('App/Models/Proyecto')
const Autorizacion= use('App/Services/AutorizacionService')

class TareaController {

    async create({auth,params,request}){
        const user= await auth.getUser();
        const {id}= params;
        const proyecto = await Proyecto.find(id);
        Autorizacion.veficarPermiso(proyecto,user);
        const {descripcion} = request.all();
        const tarea = new Tarea();
        tarea.fill({
            descripcion
        });
        await proyecto.tareas().save(tarea);
        return tarea;
    }


    async index({auth,params}){
        const user= await auth.getUser();
        const {id}= params;
        const proyecto= await Proyecto.find(id);      
        
        Autorizacion.veficarPermiso(proyecto,user);
        return await proyecto.tareas().fetch();
    }

    async update({auth,params,request}){
        const user = await auth.getUser()
        const {id}= params;
        const tarea = await Tarea.find(id);
        console.log(tarea);
        const proyecto = await Proyecto.find(tarea.proyecto_id);
        Autorizacion.veficarPermiso(proyecto,user);
        tarea.merge(request.only(['descripcion','completada']));
        await tarea.save();
        return tarea;
    }

    async destroy({auth,params}){
        const user = await auth.getUser()
        const {id}= params;
        const tarea = await Tarea.find(id);
        const proyecto = await tarea.proyecto().fetch();
        Autorizacion.veficarPermiso(proyecto,user);
        await tarea.delete();
        return tarea;
    }

}

module.exports = TareaController
