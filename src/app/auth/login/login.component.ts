import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
    
    form:FormGroup;

    constructor(private fb:FormBuilder, 
                 private authService: AuthService, 
                 private router: Router) {

        this.form = this.fb.group({
            email: ['',Validators.required],
            password: ['',Validators.required]
        });
    }

    public login = () => {
        const { email , password } = this.form.value;
        if (email && password) {
            this.authService.login(email, password)
                .subscribe(
                    (res) => {
                        console.log("User is logged in");
                        this.router.navigateByUrl('/');
                    }
                );
        } 
    }
}
