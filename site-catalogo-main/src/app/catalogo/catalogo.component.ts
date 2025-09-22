import { Component, OnInit } from '@angular/core';
import { Produto, ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    // Busca os produtos do backend
    this.produtoService.getProdutos().subscribe({
      next: (data) => this.produtos = data,
      error: (err) => console.error('Erro ao buscar produtos', err)
    });
  }

}
