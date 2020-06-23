import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  users=null;
  form: FormGroup;
  firstName;
  lastName;
  username;
  password;
  id;
  isAddMode: any;
  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    
    ) { }

  ngOnInit() {
    this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }
    this.id = this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', passwordValidators]
  });
  }
  change(){
    console.log(this.f.firstName)
    this.accountService.getById(this.id)
    .pipe(first())
    .subscribe(x => {
        this.f.firstName.setValue(x.firstName);
        this.f.lastName.setValue(x.lastName);
        this.f.username.setValue(x.username);
    });
  }
  get f() { return this.form.controls; }

}
