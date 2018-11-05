import { Status } from './../../../shared/model/status.enum';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ProjectdataService } from '../service/projectdata.service';
import { IProject } from '../model/IProject.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectlistComponent implements OnInit, OnDestroy {

  projectList : IProject[] = [];
  errorMessage : string = null;
  private sub = new Subscription();

  constructor(private projectService : ProjectdataService) { }
 
  ngOnInit() {
    this.sub = this.projectService.projectListchanged.subscribe((data) => {
      if(data.status == Status.OK) {
        this.errorMessage = null;
        this.projectList = data.content;
      } else {
        this.errorMessage = data.error;
      }
    });
    this.projectService.getAllProjects();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
