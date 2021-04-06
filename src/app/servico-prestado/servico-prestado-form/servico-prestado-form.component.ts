import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  id : number;

  constructor(
    private clienteService : ClientesService,
    private servicoPrestadoService : ServicoPrestadoService,
    private activatedRoute : ActivatedRoute,
    private router : Router
    ) {
      this.servicoPrestado = new ServicoPrestado();
     }

  ngOnInit(): void {
    this.clienteService
    .listarClientes()
    .subscribe( resposta => this.clientes = resposta);

    let params : Params = this.activatedRoute.params;
    if(params && params.value && params.value.id) {
      this.id = params.value.id;
      this.servicoPrestadoService.obterServicoById(this.id)
      .subscribe(
        response => this.servicoPrestado = response,
        errorResponse => this.servicoPrestado = new ServicoPrestado()
      )
    }
  }

  onSubmit() {
    if(this.id) {
      this.servicoPrestadoService.atualizar(this.servicoPrestado)
      .subscribe( response => {
        this.sucesso = true;
        this.erros = [];
        this.servicoPrestado = new ServicoPrestado();
      }, errorResponse => {
        this.erros = ['Erro ao atualizar serviço prestado'];
      })
    } else {
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
  }

  voltarParaListagem() {
    this.router.navigate(['/servicos-prestados/lista']);
  }

}
