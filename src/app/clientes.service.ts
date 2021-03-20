import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Cliente } from './clientes/cliente';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURLBase + '/api/clientes';
  
  constructor( private http : HttpClient ) {  }

 listarClientes() : Observable<Cliente[]>{
   return this.http.get<Cliente[]>(this.apiURL);
 }

  salvar(cliente : Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiURL}`, cliente);
  }

  obterClienteById(id : number) : Observable<Cliente>{
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  atualizar(cliente : Cliente) : Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
  }

  deletar(cliente : Cliente) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
  }
}