import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  nome : string;
  clientes : cliente[];

  constructor() { 
    this.nome = 'Rafael';
    let c1 = new cliente('Rafael', 36);
    let c2 = new cliente('Rudy', 33);
    let c3 = new cliente('Ivan', 63);
    let c4 = new cliente('Rosa', 68);

    this.clientes = [c1, c2, c3, c4];
  }

  ngOnInit(): void {
  }
}
  class cliente { 
    constructor(
      private nome : string,
      private idade : number
    ){

    }

  }

