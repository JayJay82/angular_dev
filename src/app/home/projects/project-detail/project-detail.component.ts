import { Component, OnInit } from '@angular/core';
import { ProjectdataService } from '../service/projectdata.service';
import { IProject } from '../model/IProject.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  constructor(private projectService : ProjectdataService) { }
  project : IProject = null;

  ngOnInit() {
    this.projectService.selectedProjectChanged.subscribe((data) => {
        this.project = data;
    })
  }

}
