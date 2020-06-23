import { Component, OnInit } from '@angular/core';
import { AccountService, AlertService } from '@app/_services';
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
  flag;
  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    
    ) { }

  ngOnInit() {
    // 获取页面是否为添加页面
    this.id = this.route.snapshot.params['id']
    //改变sava执行方法
    this.flag = !this.id;
    
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
    this.accountService.getById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.f.firstName.setValue(x.firstName);
        this.f.lastName.setValue(x.lastName);
        this.f.username.setValue(x.username);
    });
  }
  onsubmit() {
    if (this.flag) {
      this.change()
    } else {
      this.create()
    }
  }
  // 改当前用户的数据
  private change() {
    this.accountService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['..', { relativeTo: this.route }]);
        },
        error => {
          this.alertService.error(error);
        });
  }
  // 创建新用户
  private create() {
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Update successful', { keepAfterRouteChange: true });
          this.router.navigate(['..', { relativeTo: this.route }]);
        },
        error => {
          this.alertService.error(error);
        });
  }
  get f() { return this.form.controls; }

}
