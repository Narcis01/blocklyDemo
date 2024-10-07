import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { Workspace } from '../models/workspace';
import { Machine } from '../models/machine';

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
  // this simulates the api call to get the response from the simulation 
  getWorkspaceResponse(machine: Machine): string{
    let result: string = `Parent ${machine.name} with errors: `;
    machine.errors.forEach(error => result += `${error.description} `);
    return result;
  }

}
