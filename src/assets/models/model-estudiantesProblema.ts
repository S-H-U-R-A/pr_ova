import { ModelEstudianteProblema  } from './model-estudianteProblema';

export class ModelEstudiantesProblema {
    
    public estudiantes:any = [] ;
   
    constructor(){
    }

    public addEstudiante( estudiante:ModelEstudianteProblema ):void{
        this.estudiantes.push(estudiante);
    }

}