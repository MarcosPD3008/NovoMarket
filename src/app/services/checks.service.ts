import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChecksService {

  Check(e:any, type:string) {
    let tecla = e.keyCode

    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8 || tecla == 32) {
      return true;
    }
    let patron;

    if(type == "Lt")
      patron = /[A-Za-z]/;
    else if(type == "Nb")
      patron = /[0-9]/

    let tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
  }
}
