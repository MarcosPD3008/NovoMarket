import { Producto } from './../../interfaces/producto';
import { User } from './../../interfaces/user';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

declare const $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  producto:Producto = {
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
  productos:Producto[] = [];
  loading:boolean = false;
  start:number = 0;
  end:number = 3;
  btnCount:number[] = [];
  Collapse:boolean = false;

  constructor(private ps:ProductsService) {
    //this.productUpload()
    ps.getProductos().subscribe((data:any) =>{
      this.productos = []
      this.loading = true;
      let i = 0
      data.forEach(doc => {
        this.loading = false
        if(doc.payload.doc.id != "Categorias"){
          this.productos.push(this.ps.DataToProduct(doc.payload.doc.data(), doc.payload.doc.id));
          i++;
        }
      })

      this.loading = false;
      this.botones()
    })

  }

  productUpload(){
    let producto:Producto = {
      Nombre: "Hamburguesa Chefs Cuts",
      Caracteristicas: [{Nombre:"Cantidad", Contenido:"8 unids"},{Nombre:"Peso", Contenido:"1/4 lb"}],
      Categorias: ["Comida"],
      Codigo: "",
      Descripcion: 'Libre de gluten y soya. 1/4 libra X 8 unidades.',
      FechaCreacion: "",
      Estado: true,
      Foto: ["assets/img/chef.jpg"],
      Marca: "Chefs Cuts",
      Precio: 595
    }

    //this.ps.AgregarProducto(producto)
  }

  botones(){
    let btnCount = (this.productos.length / 3) - 1;
    for(var a = 0; a < btnCount; a++){
      this.btnCount.push(a)
    }
  }

  PageChange(index:number){
    this.start = 3 * index;
    this.end = this.start + 3;

    $('html, body').animate({
      scrollTop: '320px'
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

      $(window).bind("orientationchange", (event) => {
        this.ReSize()
      })
    })
  }
}
