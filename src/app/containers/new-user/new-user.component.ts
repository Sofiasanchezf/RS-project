import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { professional } from 'src/app/models/professional.model'
import { insuranceType } from 'src/app/models/insurance.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})


/**
 * NewUserComponent is a class that adds or updates an user
 */
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
      insuranceList: []
    }
  };

  isPatient: boolean = true;
  uniqueId: number = 1;
  minDate: Date = new Date(1800, 0, 1);
  maxDate: Date = new Date();
  selected: string = 'Patient';
  isFormValid: boolean = true;
  step: number = 0;

  constructor(private userService: UserService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // check if user has id, in this case we want to update
    this.route.params.subscribe(params => {
      if (params.id) {
        this.userService.getUserById(params.id)
          .subscribe(user => {
            this.user = user;
            // if user has medicalboardnumber, then isnt' a patient
            if (user.professional.medicalBoardNumber !== '') {
              this.isPatient = false;
            }
          });
      }
    });

  }

  submitPost(postForm: NgForm): void {
    // check is form is valid
    if (postForm.form.status === 'VALID') {

      // if has id then update the user
      if (this.user.hasOwnProperty('_id')) {
        this.userService.updateUser(this.user).subscribe(() => this.router.navigate(['/users']));
      } else { // if hasn't id, create a new user
        if (this.isPatient && this.user.professional.medicalBoardNumber != '') {
          // we empty the fields of the professional
          this.resetProfessional();
        }

        if (!this.isPatient && this.user.patient.nhc != '') {
          // we empty the fields of the patient
          this.resetPatient();
        }

        this.userService.addUser(this.user).subscribe(() => this.router.navigate(['/users']));
      }

    } else {
      this.isFormValid = false;
    }

  }

  /**
   * Empty the fields of a professional
   */
  resetProfessional(): void {
    this.user.professional.medicalBoardNumber = '';
    this.user.professional.professionalType = '';
  }

  /**
   * Empty the fields of a patient
   */
  resetPatient(): void {
    this.user.patient.nhc = '';
    this.user.patient.insuranceList = [];

  }

  /**
   * Verify if the user is a patient or a professional.
   *  If is a patient, returns true. If is a professional, returns false.
   * 
   */
  verifyIsPatient(): boolean {
    if (this.user.patient.nhc !== '') {
      return true;
    } else if (this.user.professional.medicalBoardNumber !== '') {
      return false;
    }
  }

  /**
   * Change the type of the user depends on the value of the event
   * @param event 
   */
  chooseType(event): void {
    if (event.value === 'Patient') {
      this.isPatient = true;
    } else {
      this.isPatient = false;
    }
  }

  /**
   * Change the type of the professional depends on the value of the event
   * @param event 
   */
  chooseProfessionalType(event): void {
    if (event.value === 'Doctor') {
      this.user.professional.professionalType = 'Doctor';
    } else if (event.value === 'Nurse') {
      this.user.professional.professionalType = 'Nurse';
    } else {
      this.user.professional.professionalType = 'Administrative';
    }


  }

  /**
   * Add a new insurance to insurance list of the patient
   */
  addInsurance(): void {

    let newInsurance = {
      uniqueId: this.uniqueId++,
      cardNumber: '',
      name: '',
      type: '' as insuranceType
    }
    console.log(newInsurance);
    this.user.patient.insuranceList.push(newInsurance);
  }

  /**
   * Remove the last insurance in the insurance list of the patient
   */
  removeInsurance(): void {
    this.user.patient.insuranceList.pop();
  }

  // Functions to change the step in the form
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}


