export class ModelRespuesta {
    
    public descripcion:      string;
    public correcta:        any;
   
    constructor(
        descripcion: string, 
        correcta:   any
    ){
        this.descripcion = descripcion;
        this.correcta    = correcta;

    }

}