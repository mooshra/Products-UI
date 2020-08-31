import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  @Input()
  product: Product = { name: '', productId: null, category: '', price: 0 };
  @Output()
  loadProducts = new EventEmitter<void>();

  constructor(
    public dataService: ProductsService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    if (!this.form) {
      this.form = this.fb.group({
        productId: [this.product],
        name: ['', Validators.required],
        category: [''],
        price: ['', Validators.required],
      });
    }
    this.form.patchValue(this.product);
  }

  saveProduct(): void {
    console.log(this.form.value);
    if (this.product.productId) {
      this.dataService
        .updateProduct(this.form.value)
        .pipe(take(1))
        .subscribe(() => {
          this.loadProducts.emit();
          this.activeModal.close();
        });
    } else {
      this.dataService
        .createProduct(this.form.value)
        .pipe(take(1))
        .subscribe(() => {
          this.loadProducts.emit();
          this.activeModal.close();
        });
    }
  }
}
