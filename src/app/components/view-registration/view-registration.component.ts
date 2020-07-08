import { Component, OnInit } from '@angular/core';
import { DiverService } from '../../services/diver.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.css']
})
export class ViewRegistrationComponent implements OnInit {

  public diverReg;

  constructor( public router: Router, private diverService: DiverService, private route: ActivatedRoute ) { }

  diverform: FormGroup;
  validMessage: string = "";

  ngOnInit(){

    this.diverform = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl({value: 'Hidden', disabled: true}, Validators.required),
      gender: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      certified: new FormControl('', Validators.required),
      totalDives: new FormControl('', Validators.required),
      organization: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required)
      });

      this.getDiverReg(this.route.snapshot.params.id);

    }

  getDiverReg(id:number){
    this.diverService.getDiver(id).subscribe(
      data => {
       this.diverReg = data;
       this.loadForm();
      },
      err => console.error(err),
      () => console.log('diver loaded')
    );
  }

  deleteDiverReg(id:number){
    this.diverService.deleteDiver(id).subscribe(
      data => {
       this.diverReg = data;
      },
      err => console.error(err),
      () => console.log('diver deleted')
    );
  }

  loadForm(){
    this.diverform.controls['name'].setValue(this.diverReg.name);
    this.diverform.controls['email'].setValue(this.diverReg.email);
    this.diverform.controls['phone'].setValue(this.diverReg.phone);
    this.diverform.controls['gender'].setValue(this.diverReg.gender);
    this.diverform.controls['birthday'].setValue(this.diverReg.birthday);
    this.diverform.controls['certified'].setValue(this.diverReg.certified);
    this.diverform.controls['totalDives'].setValue(this.diverReg.totalDives);
    this.diverform.controls['organization'].setValue(this.diverReg.organization);
    this.diverform.controls['country'].setValue(this.diverReg.country);
  }

  submitUpdate(){
    if (this.diverform.valid){
    this.validMessage = "Sending data to server..."
    this.diverService.updateDiverRegistration(this.diverform.value, this.diverReg.id).subscribe(
      data => {
        this.diverReg = data;
        this.validMessage = "Diver updated!";
        return true;
       },
       err => console.error(err),
       () => this.ngOnInit()
    );
  }else {
    this.validMessage = "Please fill out the required fields before submitting."
  }
  }

  clickDelete(){
    this.deleteDiverReg(this.diverReg.id);
    this.router.navigate(['/admin']);
  }


}
