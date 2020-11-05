export interface Producto {
    Nombre:string;
    Marca:string;
    Precio:number;
    Codigo:string;
    Categorias:string[];
    Descripcion?:string;
    Caracteristicas?:Caracteristica[];
    Foto:string[];
    Estado:boolean;
    FechaCreacion:string;
}

interface Caracteristica{
    Nombre:string
    Contenido:string
}
