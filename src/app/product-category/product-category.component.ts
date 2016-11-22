import { Component, OnInit } from '@angular/core';
import {ProductCategoryService} from "./product-category.service";
import {Router , ActivatedRoute} from "@angular/router";
import {AuthHttp} from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import {AppService} from "../app.service";
import { FormBuilder , FormArray , FormGroup} from '@angular/forms';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styles: []
})
export class ProductCategoryComponent implements OnInit {


    productCategory:any = {};
    productCategoryErrors = new Map<any,any>();
    productCategoryErrorsSuccess:boolean = false;
    searchForm : FormGroup;

    productCategoryParentDropDown:any = null;
    users:any = null;

    constructor(public _router:Router,
                public appService:AppService,
                private _authHttp:AuthHttp,
                private activatedRoute:ActivatedRoute,
                public productCategoryService:ProductCategoryService,
                private formBuilder : FormBuilder)
    {
    }

    ngOnInit()
    {
        this.productCategory.parent = "null";
        this.refreshProductParentCategoryDropDown();

        this.searchForm = this.formBuilder.group({
            mySearch : []
        });

        this.searchForm.controls['mySearch'].valueChanges.subscribe(
            success =>
            {
                console.log(this.searchForm.controls['mySearch'].value);
            }
        )
    }

    getProductCategoryDetails(id)
    {
        this._authHttp.get(this.appService.getApiUrl() + "api/product/category/" + id)
            .map(res=>res.json())
            .subscribe(
                successResponse =>
                {
                    this.productCategory = successResponse.data.productCategory;
                    this.productCategory.parent = this.appService.getSelectedObject(this.productCategory.parent, this.productCategoryParentDropDown);
                },
                () => console.log("Request Completed")
            );
    }

    refreshProductParentCategoryDropDown()
    {
        Observable.forkJoin(
            this.productCategoryService.getAll())
            .subscribe(
                success=>
                {

                    this.productCategoryParentDropDown = success[0].data.productCategories;
                    console.log(this.productCategoryParentDropDown);
                    if (this.activatedRoute.snapshot.params['id'])
                    {
                        this.getProductCategoryDetails(
                            this.activatedRoute.snapshot.params['id']
                        );
                    }
                }
            );
    }

    addProductCategory()
    {

        let id = '';

        if (this.activatedRoute.snapshot.params['id'])
        {
            id = this.activatedRoute.snapshot.params['id'];
        }

        this._authHttp.post(
                this.appService.getApiUrl() + 'api/product/category/save/' + id,
            JSON.stringify(this.productCategory, this.appService.jsonStringifier))
            .map(res=>res.json())
            .subscribe(
                successResponse =>
                {
                    this.productCategory = {};
                    this.productCategoryErrors.clear();
                    this.productCategoryParentDropDown.push(successResponse.data.productCategory);
                    this.productCategoryErrorsSuccess = successResponse.success;

                    setTimeout(() =>
                    {
                        this._router.navigate(['/loggedIn', 'product-category', 'list']);
                    }, 1000);
                },
                errorResponse =>
                {
                    errorResponse = errorResponse.json();
                    this.productCategoryErrors = this.appService.errorObjToMap(errorResponse.errors);
                    this.productCategoryErrorsSuccess = errorResponse.success;
                },
                ()=>console.log("Request successfully completed")
            );
    }

}
