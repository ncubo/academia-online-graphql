import { IResolvers } from "@graphql-tools/utils";
import _ from 'lodash';
import { cursorTo } from "readline";
import database from "../data/data.store";

// hay que ver dentro de schema.graphql la definición dentro de type Mutation
const mutation: IResolvers = {
    Mutation:{
      cursoNuevo(__:void, {curso}): any {
          const ItemCurso = {
              id: String(database.cursos.length + 1),
              title: curso.title,
              description: curso.description,
              clases: curso.clases,
              time: curso.time,
              level: curso.level,
              logo: curso.logo,
              path: curso.path,
              teacher: curso.teacher,
              reviews: []
          }

          if(database.cursos.filter(itemCurs => itemCurs.title === ItemCurso.title).length === 0){
            database.cursos.push(ItemCurso);
            return ItemCurso;
          }

        //   esto se retorna cuando el curso ya existe
        return {
            id: "-1",
            title: 'Hay un curso con este nombre',
            description: '',
            clases: -1,
            time: 0.0,
            level: 'TODOS',
            logo: '',
            path: '',
            teacher: '',
            reviews: []
        };

      },
      modificarCurso(__:void, {curso}): any {
        const elementoExiste = _.findIndex(database.cursos, function(o){
            return o.id === curso.id
        });
        if(elementoExiste > -1){
            const valoraciones = database.cursos[elementoExiste].reviews;
            curso.reviews = valoraciones;
            database.cursos[elementoExiste] = curso;
            return curso;
        }

        return {
            id: "-1",
            title: 'El curso no existe en la base de datos',
            description: '',
            clases: -1,
            time: 0.0,
            level: 'TODOS',
            logo: '',
            path: '',
            teacher: '',
            reviews: []
        }; 

      },
      eliminarCurso(__:void, {id}): any {
        const borrarCurso = _.remove(database.cursos, function(curso){
            return curso.id === id;
        });

        if(borrarCurso[0] === undefined){
            return {
                id: "-1",
                title: 'El curso no se puede borrar porque no existe',
                description: '',
                clases: -1,
                time: 0.0,
                level: 'TODOS',
                logo: '',
                path: '',
                teacher: '',
                reviews: []
            }; 
        }

        return borrarCurso[0];

      }
    }
}

export default mutation;