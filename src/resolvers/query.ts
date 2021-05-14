import { IResolvers } from "@graphql-tools/utils";
import database from "../data/data.store";

const query: IResolvers = {
    Query:{
        estudiantes(): any{
            return database.estudiantes;
        },
        estudiante(__:void, {id}): any{
            const resultado = database.estudiantes.filter(estudiante => estudiante.id === id)[0];
            if(resultado === undefined){
                return {
                    id: '-1',
                    name: `No se ha encontrado el estudiando con el ID ${id}`,
                    email: '',
                    courses: []      
                }          
            }
            return resultado;
        },
        cursos(): any{
            return database.cursos;
        },
        curso(__:void, {id_curso}): any{
            const resultado = database.cursos.filter(curso => curso.id === id_curso)[0];
            if(resultado === undefined){
                return {
                    id: '-1',
                    title: `No se ha encontrado el curso con el ID ${id_curso}`,
                    description: '',
                    clases: -1,
                    time: 0.0,
                    logo: '',
                    level: 'TODOS',
                    path: '',
                    teacher: '',
                    reviews: []    
                }          
            }
            return resultado;
        }
    }
}

export default query;