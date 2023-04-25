import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../interfaces/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {
  }

  createCategory(category: Category) {
    return this.httpClient.post<Category>("http://localhost:8080/category/save", category);
  }

  editCategory(category: Category) {
    return this.httpClient.patch<Category>("http://localhost:8080/category/edit", category);
  }

  deleteCategory(categoryId: number) {
    return this.httpClient.delete(`http://localhost:8080/category/delete/${categoryId}`);
  }

  findAllCategories() {
    return this.httpClient.get<[Category]>("http://localhost:8080/category/findAll");
  }

  findByName(name: string) {
    return this.httpClient.get<[Category]>(`http://localhost:8080/category/findByName/${name}`);
  }

  findById(id: number) {
    return this.httpClient.get<Category>(`http://localhost:8080/category/findById/${id}`);
  }
}
