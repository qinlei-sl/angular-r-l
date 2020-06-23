import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users = null
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
  }
  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    user.isDeleting = true;
    this.accountService.delete(id)
        .pipe(first())
        .subscribe(() => {
            this.users = this.users.filter(x => x.id !== id) 
        });
}

}
