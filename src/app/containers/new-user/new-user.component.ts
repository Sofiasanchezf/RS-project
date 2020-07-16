import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { User } from 'src/app/'
import { professional } from 'src/app/models/professional.model'
import { issuranceType } from 'src/app/models/issurance.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  user = {

    name: '',
    lastName: '',
    secondLastName: '',
    gender: '',
    birthDate: '',
    nif: '',
    address: {
      street: '',
      number: '',
      door: '',
      postalCode: '',
      city: ''
    },
    professional: {
      medicalBoardNumber: '',
      professionalType: '' as professional
    },
    patient: {
      nhc: '',
      issuranceList: {
        cardNumber: '',
        name: '',
        type: '' as issuranceType
      }
    }
  };

  isPacient = true;

  constructor(private userService: UserService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  submitPost(postForm: NgForm): void {
    console.log(postForm);
    if (postForm.form.status === 'VALID') {
      // if (this.post.hasOwnProperty('id')) {
      //   this.userService.updatePost(this.post)
      //     .subscribe(() => this.router.navigate(['/posts']));
      // } else {
      //   this.postService.insertPost(this.post)
      //     .subscribe(() => this.router.navigate(['/posts']));
      // }
      this.userService.addUser(this.user).subscribe(() => this.router.navigate(['/users']));
    }

  }

  chooseType(event): void {
    console.log(event);
    if (event.value === 'Pacient') {
      this.isPacient = true;
    } else {
      this.isPacient = false;
    }
  }


  chooseProfessionalType(event): void {
    console.log(event);
    if (event.value === 'Medico') {
      this.user.professional.professionalType = 'Doctor';
    } else if (event.value === 'Enfermero') {
      this.user.professional.professionalType = 'Nurse';
    } else {
      this.user.professional.professionalType = 'Administrative';
    }

    console.log(this.user);
  }
}
