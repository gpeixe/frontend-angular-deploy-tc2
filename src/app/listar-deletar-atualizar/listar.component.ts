import { Component, OnInit } from '@angular/core';
import { Produto } from '../Produto';
import { WebService } from '../web.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})


export class ListarComponent implements OnInit {
  
  produtoAtualizado: Produto = undefined;

  produtoParaAtualizar = {
    produto: this.produtoAtualizado,
    index: -1
  }

  listaProdutos: Produto[];

  constructor(private web : WebService) { }

  carregarProdutos() : void {
    this.web.getProdutos().subscribe(res => {
      this.listaProdutos = res;
      this.listaProdutos = this.listaProdutos.filter(p => p.name)
    });
  }

  deletarProduto(produto) : void {
    this.web.deletarProduto(produto).subscribe( _ => {
      this.listaProdutos.splice(this.listaProdutos.indexOf(produto),1)
      alert(`Produto: ${produto.title} deletado com sucesso!`)
    })
  }

  mostrarAtualizarProduto(produto) : void {
    const { ...prod } = produto
    this.produtoParaAtualizar.produto = prod
    this.produtoParaAtualizar.index = this.listaProdutos.indexOf(produto)
  }

  atualizarProduto() : void {
    if (this.produtoParaAtualizar.produto.name.length === 0) {
      alert("Informe um nome para o produto!")
      return
    }
    if (this.produtoParaAtualizar.produto.price == 0) {
      alert("Informe um preço para o produto!")
      return
    }
    if (this.produtoParaAtualizar.produto.description.length === 0) {
      alert("Informe uma descrição para o produto!")
      return
    }
    this.web.atualizarProduto(this.produtoParaAtualizar.produto).subscribe( _ => {
      this.listaProdutos[this.produtoParaAtualizar.index] = this.produtoParaAtualizar.produto
      alert(`Produto de Id: ${this.produtoParaAtualizar.produto._id} atualizado com sucesso!`)
      this.produtoParaAtualizar.produto = undefined
      this.produtoParaAtualizar.index = -1
    })
  }

  ngOnInit(): void {
    this.carregarProdutos();
  }

}
