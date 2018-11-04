import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
import { IProject } from '../model/IProject.model';
import { PROJECTS_URI } from '../../../shared/configuration/api.configuration';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProjectdataService {
 
  public projectListchanged   = new Subject<IProject[]>();
  public selectedProjectChanged = new Subject<IProject>();
 
  private projectList : IProject[] = [];
  private selectedProject : IProject = null;
 
  constructor(private http : HttpClient) { }
  
  public setSelectedProject = (project : IProject) => {
    this.selectedProject = project;
    this.selectedProjectChanged.next(this.selectedProject);
  }

  public getAllProjects = () => {
    this.http.get<IProject[]>(PROJECTS_URI).subscribe((data) => {
      this.projectList = data;
      this.projectListchanged.next(this.projectList);
    });    
  }
  
}
