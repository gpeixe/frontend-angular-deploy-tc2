import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Produto } from './Produto';
import { Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebService {
  @Output() fire: EventEmitter<any> = new EventEmitter();

  baseURL = "https://backend-tc2-peixe.glitch.me/";

  getProdutos() : Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseURL + "/products");
  }

  cadastrarProduto(produto) : Observable<any>{
    console.log(produto)
    const res = this.http.post(this.baseURL + "/products", produto, {observe: "response"})
    return res;
  }

  deletarProduto(produto) : Observable<any> {
    
    return this.http.delete(`${this.baseURL}/products/${produto._id}`, { observe: "response"})
  }

  atualizarProduto(produto) : Observable<any> {
    let body = new HttpParams();
    body = body.set("title", produto.title);
    body = body.set("price", String(produto.price));
    body = body.set("description", produto.description);
    return this.http.put(`${this.baseURL}/products/${produto._id}`, body, { observe: "response"})
  }
  constructor(private http : HttpClient) { }
}
