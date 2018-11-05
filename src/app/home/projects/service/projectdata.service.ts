import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
import { IProject } from '../model/IProject.model';
import { PROJECTS_URI } from '../../../shared/configuration/api.configuration';
import { Observable, Subject } from 'rxjs';
import { GenericResponse } from '../../../shared/model/genericResponse.model';
import { Status } from '../../../shared/model/status.enum';


@Injectable({
  providedIn: 'root'
})

export class ProjectdataService {
 
  public projectListchanged   = new Subject<GenericResponse<IProject[]>>();
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
      const response : GenericResponse<IProject[]> = new GenericResponse<IProject[]>(Status.OK,this.projectList,null);
      this.projectListchanged.next(response);
    }, (error : Response) => {
      const response : GenericResponse<IProject[]> = new GenericResponse<IProject[]>(error.status,null,error.statusText);
      this.projectListchanged.next(response);
    });    
  }
}
