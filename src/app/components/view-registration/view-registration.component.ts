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

  ngOnInit(){
    this.getDiverReg(this.route.snapshot.params.id);
    }

  getDiverReg(id:number){
    this.diverService.getDiver(id).subscribe(
      data => {
       this.diverReg = data;
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

  // submitUpdate(){
  //   this.diverService.updateDiverRegistration(this.diverform.value, this.diverReg.id).subscribe(
  //     data => {
  //       this.diverReg = data;
  //      },
  //      err => console.error(err),
  //      () => this.ngOnInit()
  //   );
  // }

  clickDelete(){
    this.deleteDiverReg(this.diverReg.id);
    this.router.navigate(['/admin']);
  }


}
