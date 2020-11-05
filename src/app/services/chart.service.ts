import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from './products.service';
import { Producto } from './../interfaces/producto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  Productos:{producto:Producto, cantidad:number, seleccionado:boolean}[] = [];
  CodeArr:string[] = []
  productos:Producto[] = []
  loading:boolean = false;
  Monto:number = 0;
  MontoSeleccionado: number = 0;

  constructor(private ps:ProductsService, private sb:MatSnackBar) { 
    ps.getProductos().subscribe((data:any) =>{
      this.productos = []
      this.loading = true;

      data.forEach(doc => {
        this.loading = false
        if(doc.payload.doc.id != "Categorias"){
          this.productos.push(this.ps.DataToProduct(doc.payload.doc.data(), doc.payload.doc.id));  
        }
      })

      if(localStorage.getItem("chart") && this.CodeArr.length == 0){
        this.Monto = 0;
        let CodeArr = localStorage.getItem("chart").split(",")
        let p = this.productos;

        CodeArr.forEach(code => {
          p.forEach(producto => {
            if(producto.Codigo == code){
              if(!this.InChart(producto, "create")){
                this.Productos.push({producto:producto, cantidad:1, seleccionado:false})
                this.CodeArr.push(producto.Codigo)
                this.Monto += producto.Precio
              }
              else
                this.InChart(producto, "add")                  
            }
          });
        }); 
        localStorage.setItem("chart",this.CodeArr.toString())  
      }   
    })
  }

  AddToChart(producto:Producto){
    if(!this.InChart(producto, "create")){
      this.Productos.push({producto:producto, cantidad:1, seleccionado:false})
      this.CodeArr.push(producto.Codigo)
      localStorage.setItem("chart",this.CodeArr.toString())  

    }
    else
      this.InChart(producto, "add")     
    
    this.Monto += producto.Precio;
    this.sb.open("Producto agregado al carrito", "Cerrar", { duration:3000 })
  }
  
  InChart(producto:Producto, action:string){
    let b = false
    this.Productos.forEach(item => {
      if(item.producto == producto){
        switch(action){
          case "create":
            b = true;
            break
          case "add":
            item.cantidad++
            this.CodeArr.push(producto.Codigo)
            localStorage.setItem("chart",this.CodeArr.toString())             
            this.Monto += producto.Precio 
 
            break 
          case "min":
            if(item.cantidad > 0){
              item.cantidad--
              this.CodeArr.splice(this.CodeArr.indexOf(producto.Codigo), 1)
              localStorage.setItem("chart",this.CodeArr.toString()) 
              this.Monto -= producto.Precio
            } 
            break
        }
      }
    });
    if(b)
      return true
    else
      return false
  }

  RemoveFromChart(producto:Producto){
    for(var p in this.Productos){
      if(this.Productos[p].producto == producto){
        this.Productos.splice(+p,1) 
      }
    }
    for(var c in this.CodeArr){
      if(this.CodeArr[c] == producto.Codigo){
        this.CodeArr.splice(+c,1)
        this.Monto -= producto.Precio
      }
    }
    localStorage.setItem("chart", this.CodeArr.toString())
  }

  ResetChart(){
    this.Productos = []
    this.CodeArr = []
    this.Monto = 0
    localStorage.removeItem("chart")
    this.MontoSeleccionado = 0;
    this.sb.open("Todos los productos han sido eliminados")  
  }

  RemoveSelected(){
    for(var producto in this.Productos){
      if(this.Productos[producto].seleccionado)
        this.RemoveFromChart(this.Productos[producto].producto)
    }
    this.GetMonto()
  }

  GetMonto(){
    this.MontoSeleccionado = 0;
    setTimeout(() => {
      this.Productos.forEach((producto) =>{
        if(producto.seleccionado) 
          this.MontoSeleccionado += (producto.producto.Precio * producto.cantidad) 
      })
    }, 100);
  }

  Comprar(Selected:boolean = false){
    let link = "https://api.whatsapp.com/send?phone=+18096130840&text="

    if(Selected){
      this.Productos.forEach(producto => {
        if(producto.seleccionado)
          link += String("*Cantidad:* " + producto.cantidad + ", *Producto:* " + producto.producto.Nombre + "%0D%0A%0D%0A") 
      });
    }
    else{
      this.Productos.forEach(producto => {
        link += String("*Cantidad:* " + producto.cantidad + ", *Producto:* " + producto.producto.Nombre + "%0D%0A%0D%0A") 
      });
    }
    window.open(link); 
  }
}
