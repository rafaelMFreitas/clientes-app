import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { Cliente } from '../../clientes/cliente';
import { ServicoPrestado } from '../servicoPrestado';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styles: [
  ]
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes : Cliente[];
  servicoPrestado: ServicoPrestado;
  sucesso : boolean = false;
  erros : String[];

  constructor(
    private clienteService : ClientesService,
    private servicoPrestadoService : ServicoPrestadoService,
    private router : Router
    ) {
      this.servicoPrestado = new ServicoPrestado();
     }

  ngOnInit(): void {
    this.clienteService
    .listarClientes()
    .subscribe( resposta => this.clientes = resposta);
  }

  onSubmit() {
    this.servicoPrestadoService
    .salvar(this.servicoPrestado)
    .subscribe( resposta => {
        this.sucesso = true;
        this.erros = [];
        this.servicoPrestado = new ServicoPrestado();
    }, errorResponse => {
        this.erros = errorResponse.error.errors;
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/servico-prestado-listagem']);
  }

}
