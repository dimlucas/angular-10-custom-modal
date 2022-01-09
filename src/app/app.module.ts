import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ModalModule } from './_modal';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { TestPageComponent } from './test-page';
import { DataService } from './services/data.service';

import { CustomInterceptor } from "./services/custom.interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

const MY_TOKEN: string = "MY_TOKEN";

const SERVER_ROOT_TOKEN = "SERVER_ROOT";
const serverRoot: string = "https://localhost:4000";
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ModalModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        TestPageComponent
    ],
    bootstrap: [AppComponent],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: CustomInterceptor,
        multi: true
    }]
})

export class AppModule { }