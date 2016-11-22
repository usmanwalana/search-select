import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import {ProductCategoryService} from "./product-category/product-category.service";
import { provideAuth } from 'angular2-jwt';
import {AppService} from "./app.service";
import {routing} from "./app.routes";
import { MypipetestingComponent } from './mypipetesting/mypipetesting.component';
import {SearchPipe} from './search.pipe';
import { UsersComponent } from './users/users.component';
import {UsersService} from "./users/users.service";
import { SelectModule } from 'angular2-select';
@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryComponent,
    MypipetestingComponent,
      SearchPipe,
      UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
      ReactiveFormsModule,
    HttpModule,
    routing,
      SelectModule,
  ],
  providers: [
    ProductCategoryService,
    provideAuth({globalHeaders: [{'Content-Type': 'application/json'}]}),
      AppService,
      UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
