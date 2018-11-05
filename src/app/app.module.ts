import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ProjectlistComponent } from './home/projects/projectlist/projectlist.component';
import { ProjectDetailComponent } from './home/projects/project-detail/project-detail.component';
import { ProjectItemComponent } from './home/projects/projectlist/project-item/project-item.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from '../app/auth/service/authInterceptor';
import { AuthGuard } from './auth/service/guard/authguard.guard';
import { AuthService } from './auth/service/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    ProjectlistComponent,
    ProjectDetailComponent,
    ProjectItemComponent,
    LoginComponent
  ],
  imports:[
 CommonModule,
NgtUniversalModule,
 
    
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class AppModule { }
