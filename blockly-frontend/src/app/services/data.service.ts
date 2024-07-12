import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Workspace } from '../common/workspace';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  categoriesURL: string = "http://localhost:8080/api/categories";
  workspaceURL: string = "http://localhost:8080/api/workspace";
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesURL);
  }

  saveWorkspace(workspace: Workspace): Observable<Workspace>{
    return this.http.post<Workspace>(this.workspaceURL, workspace);
  }

  getWorkspaces(): Observable<Workspace[]>{
    return this.http.get<Workspace[]>(this.workspaceURL);
  }

}
