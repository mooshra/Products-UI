import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Product } from '../data/product';

const productsData: { products: Product[] } = {
  products: [
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
  ],
};

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET' && request.url.endsWith('products/list')) {
      return of(new HttpResponse({ status: 200, body: productsData }));
    }
    if (request.method === 'GET' && request.url.endsWith('products/item')) {
      const product = productsData.products.find(p => p.productId === request.params[0]);
      return of(new HttpResponse({ status: 200, body: product }));
    }
    if (request.method === 'POST' && request.url.endsWith('products')) {
      const product = request.body;

      product.productId = productsData.products.length
        ? Math.max(...productsData.products.map(x => x.productId)) + 1
        : 1;
      productsData.products.push(product);
      localStorage.setItem('users', JSON.stringify(productsData.products));

      return of(new HttpResponse({ status: 200 }));
    }

    if (request.method === 'DELETE' && request.url.endsWith('products')) {
      productsData.products = productsData.products.filter(x => x.productId !== request.params[0]);
      localStorage.setItem('users', JSON.stringify(productsData.products));
      return of(new HttpResponse({ status: 200 }));
    }

    if (request.method === 'PUT' && request.url.endsWith('products')) {
      const product = request.body;
      const index = productsData.products.findIndex(p => p.productId === product.productId);
      if (index !== -1) {
        productsData.products[index] = product;
        localStorage.setItem('users', JSON.stringify(productsData.products));
        return of(new HttpResponse({ status: 200 }));
      }
    }

    next.handle(request);
  }
}
