import { Producto } from './../interfaces/producto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import "rxjs/Rx"
import 'rxjs/add/operator/toPromise';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  itemsCollection: AngularFirestoreCollection<any>
  productos:Producto[] = []
  loading:boolean = false;
  
  constructor(private firestore:AngularFirestore, private sb:MatSnackBar) { 
    this.itemsCollection = firestore.collection("productos");
    if(this.productos.length == 0) 
      this.getProductos()
  }

  getProductos(){
    return this.itemsCollection.snapshotChanges()
  }

  getProductsByCategory(category:string){
    this.loading = true
    return this.firestore.collection("productos", ref => ref.where("Categorias", "array-contains", category)).get()
  }

  DataToProduct(data:any, codigo:string): Producto{
    let p:Producto = { 
      Nombre: "",
      Caracteristicas: [],
      Categorias: [""],
      Codigo: "",
      Descripcion: "",
      FechaCreacion: "",
      Estado: true,
      Foto: [""],
      Marca: "",
      Precio: 0
    }

    p.Codigo = codigo;
    if(data.Categorias) p.Categorias = data.Categorias
    if(data.Nombre) p.Nombre = data.Nombre
    if(data.Marca) p.Marca = data.Marca
    if(data.Precio) p.Precio = data.Precio
    if(data.Descripcion) p.Descripcion = data.Descripcion
    if(data.Caracteristicas) p.Caracteristicas = data.Caracteristicas
    if(data.Foto) p.Foto = data.Foto
    if(data.Estado) p.Estado = data.Estado
    if(data.FechaCreacion) p.FechaCreacion = data.FechaCreacion
    return p
  }

  getProductByName(){
    return this.firestore.collection("productos", ref => ref.orderBy("Nombre","asc"))
    .valueChanges() 
  }

  AgregarProducto(producto: Producto){ 
    //producto.Precio = 3000; 
    this.loading = true
    //subir foto
    let p = { 
      Nombre: producto.Nombre,
      Caracteristicas: producto.Caracteristicas,
      Categorias: producto.Categorias,
      Codigo: producto.Codigo,
      Descripcion: producto.Descripcion,
      FechaCreacion: producto.FechaCreacion,
      Estado: producto.Estado,
      Foto: producto.Foto,
      Marca: producto.Marca,
      Precio: producto.Precio
    } 

    this.firestore.collection("productos").add(p)   
    .then(() =>{
      this.sb.open("Producto agregado Correctamente", "Cerrar", {duration: 3000})
      this.loading = false;
    })
    .catch((err) =>{
      console.error(err)
      this.loading = false;
      this.sb.open("Ocurrio un error guardando el Producto", "Cerrar", {duration: 3000})
    })
  } 

  GetCategorias(){
    return this.itemsCollection.doc("Categorias").valueChanges()
  }

  getByDoc(doc:string){
    return this.itemsCollection.doc(doc).valueChanges()
  }
}