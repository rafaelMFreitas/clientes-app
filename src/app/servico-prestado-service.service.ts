import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoServiceService {

  apiURL: string = environment.apiURLBase + '/api/servicos-prestados';

  constructor(private http: HttpClient) { }

  salvar(servicoPrestado : ServicoPrestado) : Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(`${this.apiURL}`, servicoPrestado);
  }
}