export class ModelProblema {
    
    public id:          any;
    public pin:         any;
    public titulo:      any;
    public descripcion: any;
    public imagen:      any;
    public pregunta:    any;
    public fecha:       any;
   
    constructor(
        id:             any, 
        pin:            any,
        titulo:         any,
        descripcion:    any,
        imagen:         any,
        pregunta:       any,
        fecha:          any
    ){
        this.id             = id;
        this.pin            = pin;
        this.titulo         = titulo;
        this.descripcion    = descripcion;
        this.imagen         = imagen;
        this.pregunta       = pregunta;
        this.fecha          = fecha;
    }

}