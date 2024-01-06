import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from './services/user-service.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import {  HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    NavbarComponent,
    HttpClientModule,
    MatListModule,
    RouterOutlet,
    MatListModule,
    MatListModule,
    CKEditorModule 
  ],
  providers: [UserServiceService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'examfrontend';
}
