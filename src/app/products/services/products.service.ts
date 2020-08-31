import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/products/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProductsList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/list`);
  }

  createProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/create`, { product });
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/update`, { product });
  }

  deleteProduct(id: number): Observable<void> {
    const params = new HttpParams().set('id', id.toString() || '');
    return this.http.delete<void>(`${environment.apiUrl}/delete`, { params });
  }
}
