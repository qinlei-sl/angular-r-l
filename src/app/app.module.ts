import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { UserTableComponent } from './user-table/user-table.component';;
// tslint:disable-next-line:import-spacing
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
   ;
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import en from '@angular/common/locales/en';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AddUserComponent } from './add-user/add-user.component';
import { NzInputModule } from 'ng-zorro-antd/input';

registerLocaleData(en);
@NgModule({
   imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      BrowserAnimationsModule,
      NzTableModule,
      NzDividerModule,
      NzButtonModule,
      NzInputModule
   ],
   declarations: [
      AppComponent,
      AlertComponent,
      HomeComponent,
      UserTableComponent,
      AddUserComponent
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: LocationStrategy, useClass: HashLocationStrategy },
      // provider used to create fake backend
      fakeBackendProvider,
      { provide: NZ_I18N, useValue: en_US }],
   bootstrap: [
      AppComponent
   ]
   ,
})
export class AppModule { };