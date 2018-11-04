import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProjectdataService } from '../service/projectdata.service';
import { IProject } from '../model/IProject.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectlistComponent implements OnInit {
  projectList : IProject[] = [];
  private sub = new Subscription();

  constructor(private projectService : ProjectdataService) { }
 
  ngOnInit() {
    this.sub = this.projectService.projectListchanged.subscribe((data) => this.projectList = data);
    this.projectService.getAllProjects();
  }

}
