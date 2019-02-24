import { ModelProblema  } from './model-problema';

export class ModelProblemas {
    
    public problemas:any = [] ;
   
    constructor(){
    }

    public addProblema( problema:ModelProblema ):void{
        this.problemas.push( problema );
    }

}