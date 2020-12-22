import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyNominationContainerComponent } from './my-nomination-container/my-nomination-container.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSliderModule } from '@angular/material/slider';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './shared/login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioGroup,MatRadioButton,MatRadioModule} from '@angular/material/radio';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { NominationComponent } from './nomination/nomination.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ViewNominationsComponent } from './view-nominations/view-nominations.component';
import { NominationDetailsComponent } from './nomination-details/nomination-details.component';
import { SetupProgramComponent } from './setup-program/setup-program.component';
import { ViewImageComponent } from './shared/view-image/view-image.component';

@NgModule({
  declarations: [
    AppComponent,
    MyNominationContainerComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    NominationComponent,
    ViewNominationsComponent,
    NominationDetailsComponent,
    SetupProgramComponent,
    ViewImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatSliderModule,
    MatSliderModule,
    MatCommonModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
