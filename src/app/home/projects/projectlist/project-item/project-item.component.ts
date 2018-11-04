import { Component, OnInit, Input } from '@angular/core';
import { IProject } from '../../model/IProject.model';
import { ProjectdataService } from '../../service/projectdata.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  @Input() project : IProject;
  
  constructor(private projectService : ProjectdataService) { }

  ngOnInit() {
  }

  selectedProject(event : Event) {
    event.preventDefault();
    this.projectService.setSelectedProject(this.project);
  }
}
