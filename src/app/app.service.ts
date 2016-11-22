import { Injectable } from '@angular/core';
import { Router , } from '@angular/router';
@Injectable()
export class AppService
{

    private _apiUrl:String = 'http://localhost:9999/';
    public loading:boolean = false;

    constructor(private _router:Router)
    {
    }

    isAccessed(array, id)
    {
        if (!array) return;
        for (let i = 0; i < array.length; i++)
        {
            if (array[i].module.id == id)
            {
                return true;
            }
        }
        return false;
    }




    startLoading()
    {
        this.loading = true;
    }

    stopLoading()
    {
        this.loading = false;
    }

    getApiUrl()
    {
        return this._apiUrl;
    }

    navigateToAppDashBoard()
    {
        this._router.navigate(['LoggedIn', 'User', 'Dashboard']);
    }

    navigateToAppLogin()
    {
        this._router.navigate(['auth']);
    }

    errorObjToMap(objectArray:any)
    {
        let map = new Map<any,any>();
        for (let obj of objectArray)
        {
            map.set(obj.field, obj.message);
        }
        return map;
    }

    //isRouteActive(linkParams:any[])
    //{
    //    return this._router.generate(linkParams).toLinkUrl().toString().split("/")[1] == this._location.path().toString().split("/")[1];
    //    // return this._router.isRouteActive(this._router.generate(linkParams));
    //}

    hasId(objectArray:any, value, field):boolean
    {

        for (let obj of objectArray)
        {
            if (obj[field] == value)
            {
                return true;
            }
        }

        return false;
    }

    jsonStringifier(key, value)
    {
        if (value == "null")
        {
            return null;
        }

        if (value == null)
        {
            return;
        }


        return value;
    }


    //returns ths selected object for drop down
    getSelectedObject(source, dropDown)
    {
        if (source == null || source == 'null')
        {
            return "null";
        }

        if (source != null)
        {
            for (let item of dropDown)
            {
                if (item.id == source.id)
                {
                    return item;
                }
            }
        }

        return "null";
    }

    getSelectedDefaultObject(dropDown)
    {
        for (let item of dropDown)
        {
            if (item.isDefault == 1)
            {

                return item;
            }
        }

        return "null";
    }
}
