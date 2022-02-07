import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Globals } from './SERVICES/app-global';
import { BodyComponent } from './BODY/container/body/body.component';
import { DashboardComponent } from './TABLE/container/dashboard/dashboard.component';
import { DataComponent } from './TABLE/container/data/data.component';

// import { GlobalModule } from '../app/services/app-global';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    DashboardComponent,
    DataComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    // GlobalModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
