import { RouterModule , Routes } from '@angular/router';
import {ProductCategoryComponent} from "./product-category/product-category.component";
import {UsersComponent} from "./users/users.component";

const APP_ROUTES : Routes = [
    { path : '' , component : UsersComponent}

];
export const routing = RouterModule.forRoot(APP_ROUTES);