import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser(this.route.snapshot.params.id);


    // this.route.params.subscribe(params => {
    //   if (params.id) {
    //     this.userService.getUserById(params.id)
    //       .subscribe(post => {
    //         this.user = post;
    //       });
    //   }
    // });

    console.log('this ' + this.user);

  }

  getUser(id: string): void {
    console.log('id:' + id);
    this.userService.getUserById(id).subscribe((result: User) => {
      this.user = result;
      console.log('imprimipendo user ');
      console.log(this.user);
    });
  }
  
}
