import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURL: string = environment.apiURLBase + '/api/servicos-prestados';

  constructor(private http: HttpClient) { }

  obterServicoById(id : number) : Observable<ServicoPrestado>{
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  salvar(servicoPrestado : ServicoPrestado) : Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(`${this.apiURL}`, servicoPrestado);
  }

  //buscar(nome: string, mes: number) : Observable<ServicoPrestadoBusca[]>{
  //  const params = new HttpParams()
  //  .set("nome", nome)
  //  .set("mes", mes ?  mes.toString() : '');
    
  //  return this.http.get<any[]>(this.apiURL + "?" + params.toString());
  // }

  buscar(nome: string) : Observable<ServicoPrestadoBusca[]>{
    const params = new HttpParams()
    .set("nome", nome);
    
    return this.http.get<any[]>(this.apiURL + "?" + params.toString());
  }

  atualizar(servicoPrestado : ServicoPrestado) : Observable<ServicoPrestado> {
    return this.http.put<ServicoPrestado>(`${this.apiURL}/${servicoPrestado.id}`, servicoPrestado);
  }

  deletar(servicoPrestado : ServicoPrestado) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${servicoPrestado.id}`);
  }
}
