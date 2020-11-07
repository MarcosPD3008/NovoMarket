import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from './../../../interfaces/producto';
import { ProductsService } from './../../../services/products.service';
import { Component, ElementRef, OnInit } from '@angular/core';

declare const $:any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html', 
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  Categorias:string[] = ["Comida", "Bebidas alcoholicas", "Bebidas", "Limpieza", "Higiene personal"].sort()
  word:string = "";
  productos:Producto[] = []
  Titulo = "Seleccione o busque un producto"
  loading:boolean = false;
  Collapse:boolean = false;
  start:number = 0;
  end:number = 3;
  btnCount:number[] = [];

  constructor(public ps:ProductsService, private sb:MatSnackBar) { 
    this.loading = true;
    this.GetProductos()
    ps.GetCategorias().subscribe((data:any) =>{ 
      this.Categorias = data.Categoria
    })
  }

  botones(){    
    let btnCount = (this.productos.length / 3) - 1;
    this.btnCount = []
    for(var a = 0; a < btnCount; a++){
      this.btnCount.push(a)
    }
    if(this.btnCount == []) this.btnCount.push(0)
  }

  PageChange(index:number){
    this.start = 3 * index;
    this.end = this.start + 3;

    $('html, body').animate({
      scrollTop: 0
    }, 500)
  }

  ReSize(){
    if($(window).width() < 575){
      this.Collapse = false;
    }
    else{
      this.Collapse = true;
    }
  }
  
  ngOnInit(): void {
    $(window).ready( () =>{
      this.ReSize()
      $(window).resize( () => {
        this.ReSize()
      })
    })
  }

  GetProductos(){
    this.ps.getProductos().subscribe((data:any) =>{
      this.productos = []
      this.loading = true;
      this.Titulo = "Seleccione o busque un producto"

      data.forEach(doc => {
        this.loading = false
        if(doc.payload.doc.id != "Categorias"){
          this.productos.push(this.ps.DataToProduct(doc.payload.doc.data(), doc.payload.doc.id));  
        }
      })

      this.botones()
      this.loading = false;
    })
  }

  ColorChg(id:any, event:Event){
    let element = document.getElementById(id) 
    if(event.type == "mouseover"){
      element.style.color = 'red';
    }
    else if(event.type == "mouseleave"){
      element.style.color = 'black';
    }
  }

  SortByCategory(category:string){
    if(category.trim() == "Seleccione una categoria..."){
      this.GetProductos();
      return
    } 

    this.ps.getProductsByCategory(category).subscribe((snapshot) => { 
      this.productos = []
      this.Titulo = "Categoria de busqueda: " + category
      if (snapshot.empty) {
        this.loading = false
        this.sb.open('No hay productos en esa categoria', "Cerrar", {duration: 3000});
        this.botones()
        return;
      }
  
      snapshot.forEach(doc => {
        this.loading = false
        this.productos.push(this.ps.DataToProduct(doc.data(), doc.id)); 
        this.botones()
      });
    })
  }

  SearchByName(){
    if(this.word == null || this.word == undefined || this.word == ""){
      this.GetProductos()
      this.botones()
      return
    }

    this.loading = true;
    this.Titulo = "Palabra de busqueda: " + this.word
    let word = this.word.toLowerCase();
    let arr = []

    this.ps.getProductByName().subscribe((products:Producto[]) =>{
      for(var producto in products){      
        if(products[producto].Nombre){
          let nombre = products[producto].Nombre.toLowerCase()
          if(nombre.toLowerCase().startsWith(word)){
            arr.push(products[producto]) 
          }
        }
      }
      if(arr.length == 0){
        this.sb.open("No hay productos con este nombre", "Cerrar", {duration: 3000})
      } 
      this.productos = arr
      this.loading = false;
      this.botones()
    })    
  }
}