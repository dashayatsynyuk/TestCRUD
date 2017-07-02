import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './Components/home.component';
import { RegionsService } from './Service/regions.service';
import { RegionsComponent } from './Components/regions.component';
import { ManageRegion } from './Components/manageregion.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal'; //Ng2Bs3ModalModule, 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from '@angular/material'


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, BrowserAnimationsModule, MaterialModule, Ng2Bs3ModalModule],
    declarations: [AppComponent, RegionsComponent, HomeComponent, ManageRegion],
    entryComponents: [ManageRegion],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, RegionsService],
    bootstrap: [AppComponent]
})

export class AppModule { }