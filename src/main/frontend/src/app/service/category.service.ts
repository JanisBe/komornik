import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../model/category";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {
  }

  createCategory(category: Category) {
    return this.httpClient.post<Category>(`http://${environment.API_URL}/category/save`, category);
  }

  editCategory(category: Category) {
    return this.httpClient.patch<Category>(`http://${environment.API_URL}/category/edit/${category.id}`, category);
  }

  deleteCategory(categoryId: number) {
    return this.httpClient.delete(`http://${environment.API_URL}/category/delete/${categoryId}`);
  }

  findAllCategories() {
    return this.httpClient.get<Category[]>(`http://${environment.API_URL}/category/findAll`);
  }

  findByName(name: string) {
    return this.httpClient.get<Category[]>(`http://${environment.API_URL}/category/findByName/${name}`);
  }

  findById(id: number) {
    return this.httpClient.get<Category>(`http://${environment.API_URL}/category/findById/${id}`);
  }
}
