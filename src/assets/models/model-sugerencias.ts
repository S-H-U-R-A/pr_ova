import { ModelSugerencia  } from './model-sugerencia';

export class ModelSugerencias {
    
    public sugerencias:any = [] ;
   
    constructor(){
    }

    public addSugerencia( sugerencia:ModelSugerencia ):void{
        this.sugerencias.push(sugerencia);
    }

}