import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ProductEditComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  title = 'appBootstrap';

  closeResult: string;
  selectedProduct;

  @Input()
  products: Product[];
  @Output()
  loadProducts = new EventEmitter<void>();

  constructor(public dataService: ProductsService, private modalService: NgbModal) {}

  ngOnInit() {}

  public handleOpenModal(product?: Product) {
    const modalRef = this.modalService.open(ProductEditComponent);
    if (product) {
      modalRef.componentInstance.product = product;
    }
    modalRef.componentInstance.loadProducts.subscribe(() => this.loadProducts.emit());
  }

  handleSelectProduct(product: Product): void {
    this.selectedProduct = product;
  }

  handleDeleteProduct(id: number) {
    this.dataService
      .deleteProduct(id)
      .pipe(take(1))
      .subscribe(() => this.loadProducts.emit());
  }
}
