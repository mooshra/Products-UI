import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Product } from '../../products/models/product';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  products: Product[] = [
    {
      productId: 1,
      name: 'test 1',
      price: 100,
      category: 'category',
    },
    {
      productId: 2,
      name: 'test 2',
      price: 111,
      category: 'category',
    },
  ];

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET' && request.url.endsWith('products/list')) {
      console.log(localStorage.getItem('products'));
      return of(
        new HttpResponse({ status: 200, body: JSON.parse(localStorage.getItem('products')) })
      );
    }
    if (request.method === 'GET' && request.url.endsWith('products/item')) {
      const product = this.products.find(p => p.productId === request.params[0]);
      return of(new HttpResponse({ status: 200, body: product }));
    }
    if (request.method === 'POST' && request.url.endsWith('products/create')) {
      const product = request.body.product;

      product.productId = this.products.length
        ? Math.max(...this.products.map(x => x.productId)) + 1
        : 1;
      this.products.push(product);
      localStorage.setItem('products', JSON.stringify(this.products));

      return of(new HttpResponse({ status: 200 }));
    }

    if (request.method === 'DELETE' && request.url.endsWith('products/delete')) {
      this.products = this.products.filter(x => x.productId !== +request.params.get('id'));
      localStorage.setItem('products', JSON.stringify(this.products));
      return of(new HttpResponse({ status: 200 }));
    }

    if (request.method === 'PUT' && request.url.endsWith('products/update')) {
      const product = request.body.product;
      const index = this.products.findIndex(p => p.productId === product.productId);
      if (index !== -1) {
        const response = this.products.slice();
        response.splice(index, 1, product);
        this.products = response;
        localStorage.setItem('products', JSON.stringify(this.products));
        return of(new HttpResponse({ status: 200 }));
      }
    }

    next.handle(request);
  }
}
