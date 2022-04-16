import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';

import { AppComponent } from './app.component';
import { UserComponent } from "./user/user.component";
import { StartComponent } from './start/start.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CardUserComponent } from './card-user/card-user.component';
import { HttpService } from "./http.service";
import { WeatherPageComponent } from './weather-page/weather-page.component';
import {environment} from "../environments/environment";
import { FooterComponent } from './footer/footer.component';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { InputModalComponent } from './input-modal/input-modal.component';

const appRoutes: Routes =[
  { path: '', component: StartComponent},
  { path: 'user', component: UserComponent},
  { path: 'weather', component: WeatherPageComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    StartComponent,
    NotFoundComponent,
    CardUserComponent,
    WeatherPageComponent,
    FooterComponent,
    InfoModalComponent,
    InputModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionModule,
    TableModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapBox.accessKey, // Optional, can also be set per map (accessToken input of mgl-map)
      geocoderAccessToken: 'TOKEN' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
