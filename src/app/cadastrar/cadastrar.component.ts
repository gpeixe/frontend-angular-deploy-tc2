import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  produto = {name : "", price: 0.0, description: ""};

  constructor(private web : WebService) { }

  cadastrar() {
    if (this.produto.name.length === 0) {
      alert("Informe um nome para o produto!")
      return
    }
    if (this.produto.price == 0) {
      alert("Informe um preço para o produto!")
      return
    }
    if (this.produto.description.length === 0) {
      alert("Informe uma descrição para o produto!")
      return
    }
    this.web.cadastrarProduto(this.produto).subscribe(res => {
      if(res.ok == true) {
        alert("O cadastro foi realizado com sucesso");
        location.href = location.href
      } else {
        console.log()
        alert("O cadastro não foi realizado!");
      }
    });
  }

  ngOnInit(): void {
  }

}
