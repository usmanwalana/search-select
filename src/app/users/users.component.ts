import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormArray , FormGroup , FormControl} from '@angular/forms';
import {UsersService} from "./users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  fetchedUsers :any = [];
  selectedUsers :any = [];
  searchForm : FormGroup;
  myOptions = [];
  constructor(private usersService : UsersService,private formBuilder : FormBuilder){
  }

  ngOnInit()
  {
    this.searchForm = this.formBuilder.group({
      mySearch : []
    });

    this.usersService.getUsers().subscribe(
        success =>
        {
          this.fetchedUsers = success;
        }
    );
  }
}
