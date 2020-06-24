import { Component, OnInit } from '@angular/core';
import { DiverService } from '../../services/diver.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.css']
})
export class ViewRegistrationComponent implements OnInit {

  public diverReg;

  constructor( private diverService: DiverService, private route: ActivatedRoute ) { }

  ngOnInit(){
    this.getDiverReg(this.route.snapshot.params.id);
    }

  getDiverReg(id:number){
    this.diverService.getDiver(id).subscribe(
      data => {
       this.diverReg = data;
      },
      err => console.error(err),
      () => console.log('divers loaded')
    );
  }



}
