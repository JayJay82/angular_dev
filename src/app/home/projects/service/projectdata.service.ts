import { GenericResponse } from './../../../shared/model/genericResponse.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse}  from '@angular/common/http';
import { IProject } from '../model/IProject.model';
import { PROJECTS_URI } from '../../../shared/configuration/api.configuration';
import { Observable, Subject } from 'rxjs';
import { Status } from '../../../shared/model/status.enum';


@Injectable({
  providedIn: 'root'
})

export class ProjectdataService {
 
  public projectListchanged   = new Subject<GenericResponse<IProject[]>>();
  public selectedProjectChanged = new Subject<IProject>();
  public projectAdded = new Subject<GenericResponse<IProject>>();
 
  private projectList : IProject[] = [];
  private selectedProject : IProject = null;
  private lastAddedProject : IProject = null;
 
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

  public addProject = (project : IProject) => {
    this.http.post<IProject>(PROJECTS_URI,project,{ observe: 'response' }).subscribe((result) => {
      const response = new GenericResponse(Status.OK,result.body,"");
      this.lastAddedProject = result.body;
      this.projectAdded.next(response);
    },
    (error : HttpErrorResponse) => {
      const response = new GenericResponse(error.status,null,error.message);
      this.projectAdded.next(response);
    })
  }
}
