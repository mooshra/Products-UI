import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpMethods } from '../data';
import { getProductsJson, setProductsJson } from './http-helpers';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    switch (request.method) {
      case HttpMethods.GET:
        if (request.url.endsWith('products/list')) {
          console.log(getProductsJson());
          return of(new HttpResponse({ status: 200, body: getProductsJson() }));
        }
        if (request.url.endsWith('products/item')) {
          const product = getProductsJson().find(p => p.productId === request.params[0]);
          return of(new HttpResponse({ status: 200, body: product }));
        }
        break;
      case HttpMethods.POST:
        if (request.url.endsWith('products/create')) {
          const newProduct = request.body.product;
          const products = getProductsJson();
          newProduct.productId = products.length
            ? Math.max(...products.map(x => x.productId)) + 1
            : 1;
          products.push(newProduct);
          setProductsJson(products);
          return of(new HttpResponse({ status: 200 }));
        }
        break;
      case HttpMethods.PUT:
        if (request.url.endsWith('products/update')) {
          const editedProduct = request.body.product;
          const products = getProductsJson();
          const index = products.findIndex(p => p.productId === editedProduct.productId);
          if (index !== -1) {
            products.splice(index, 1, editedProduct);
            setProductsJson(products);
            return of(new HttpResponse({ status: 200 }));
          }
        }
        break;
      case HttpMethods.DELETE:
        if (request.url.endsWith('products/delete')) {
          const products = getProductsJson().filter(x => x.productId !== +request.params.get('id'));
          setProductsJson(products);
          return of(new HttpResponse({ status: 200 }));
        }
    }

    next.handle(request);
  }
}
