import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username : string;
  password : string;
  erros : String[];
  cadastrando : boolean;
  mensagemSucesso: string;

  constructor(
    private router : Router,
    private authService : AuthService) { }

  onSubmit() {
    this.router.navigate(['/home'])
    console.log(`User: ${this.username}, Pass: ${this.password}`);
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {
    const usuario : Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;

    this.authService.salvar(usuario)
      .subscribe( response => {
        this.erros = [];
        this.mensagemSucesso = "Cadastro realizado com sucesso, efetue o login"
        this.cadastrando = false;
        this.username = "";
        this.password = ""
      }, errorResponse => {
        this.erros = errorResponse.error.errors;
        this.mensagemSucesso = null;
      })
  }

}
