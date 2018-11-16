import { SnackService } from './../../../shared/snack.service';
import { ProjectdataService } from './../service/projectdata.service';
import { Project } from './../../projects/model/project.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProject } from '../../projects/model/IProject.model';
import { Subscription } from 'rxjs';
import { Status } from '../../../shared/model/status.enum';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers : [SnackService]
})
export class AddProjectComponent implements OnInit {
  addSub : Subscription;
  form : FormGroup;
  model : IProject = new Project();
  constructor(private fb:FormBuilder, private dataService : ProjectdataService, private snackBarService : SnackService) { }

  ngOnInit() {
    this.addSub = this.dataService.projectAdded.subscribe((result) => {
      if(result.status != Status.OK)
          this.snackBarService.openSnackBar(result.error,"Chiudi");
      else 
          this.snackBarService.openSnackBar("Oggetto Aggiunto","Chiudi");
     });
     
    this.form = this.fb.group({
      title: [this.model.title,Validators.required],
      description: [this.model.description,Validators.required],
      image : [this.model.image, Validators.required]
    });
  }

  submitClick = () => {
    if(this.form.valid) {
      const { title , description , image } = this.form.value;
      const project = new Project(2,title,description,image);
      this.dataService.addProject(project);
    }
  }
}
