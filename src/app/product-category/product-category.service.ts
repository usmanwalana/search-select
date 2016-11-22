import { Injectable } from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {AppService} from "../app.service";
import { Http} from '@angular/http';

@Injectable()
export class ProductCategoryService {

  constructor(private appService:AppService, private authHttp:AuthHttp , private http : Http)
  {

  }

  public getUsers()
  {
    return this.http.get("https://jsonplaceholder.typicode.com/users").map(res=>res.json());
  }
  public getAll()
  {
    return this.authHttp.get(
            this.appService.getApiUrl() + "api/product/category/list")
        .map(res => res.json());
  }

  public findById(id)
  {
    return this.authHttp.get(
            this.appService.getApiUrl() + "api/product/category/" + id)
        .map(res=>res.json());
  }

  public delete(id)
  {
    return this.authHttp.delete(
        this.appService.getApiUrl() + 'api/product/category/' + id
    ).map(res=>res.json())
  }
}
