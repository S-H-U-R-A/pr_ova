import { ModelRespuesta  } from './model-respuesta';

export class ModelRespuestas {
    
    public respuestas:any = [] ;
   
    constructor(){
    }

    public addRespuesta( respuesta:ModelRespuesta ):void{
        this.respuestas.push(respuesta);
    }

}