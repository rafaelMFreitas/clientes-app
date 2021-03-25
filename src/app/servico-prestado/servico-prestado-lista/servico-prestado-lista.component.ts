import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

nome : string;
mes : number;
meses : number [];
lista : ServicoPrestadoBusca [];
message : string;

  constructor(
    private service : ServicoPrestadoService, 
    private router : Router) { 
      this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
  }

  ngOnInit(): void {
  }

  novoCadastro() {
    this.router.navigate(['/servico-prestado-form']);
  }

  consultar() : void {
    this.service.buscar(this.nome, this.mes)
    .subscribe( resposta => {
      this.lista = resposta;
      if(this.lista.length <= 0) {
        this.message = "Nenhum Registro emcontrado.";
      } else {
        this.message = '';
      }
    });
  }
}
