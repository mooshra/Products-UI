import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';

import { Product } from '../../models/product';
import { fetchProducts, loadProducts } from '../../store/products/products.actions';
import { selectProducts, selectProductsLoading } from '../../store/products/products.selectors';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.scss'],
})
export class ProductsContainerComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(selectProducts));
    this.loading$ = this.store.pipe(select(selectProductsLoading));

    this.store.dispatch(fetchProducts());
  }

  handleLoadProducts(): void {
    this.store.dispatch(loadProducts());
  }
}
