import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { professional } from 'src/app/models/professional.model'
import { issuranceType } from 'src/app/models/issurance.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  user: User = {
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
    this.route.params.subscribe(params => {
      if (params.id) {
        this.userService.getUserById(params.id)
          .subscribe(user => {
            this.user = user;
          });
      }
    });
  }

  submitPost(postForm: NgForm): void {
    console.log(postForm);
    if (postForm.form.status === 'VALID') {
      if (this.user.hasOwnProperty('id')) {
        this.userService.updateUser(this.user).subscribe(() => this.router.navigate(['/users']));
      } else {
        if (this.isPacient && this.user.professional.medicalBoardNumber != '') {
          this.resetProfessional();
        }

        if (!this.isPacient && this.user.patient.nhc != '') {
          this.resetPatient();
        }
        this.userService.addUser(this.user).subscribe(() => this.router.navigate(['/users']));
      }
      
    }

  }

  resetProfessional(): void {
    this.user.professional.medicalBoardNumber = '';
    this.user.professional.professionalType = '';
  }

  resetPatient(): void {
    this.user.patient.nhc = '';
    this.user.patient.issuranceList = { cardNumber: '', name: '', type: '' as issuranceType };

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
