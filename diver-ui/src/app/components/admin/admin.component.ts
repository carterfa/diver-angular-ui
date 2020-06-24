import { Component, OnInit } from '@angular/core';
import { DiverService } from '../../services/diver.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public divers;

  constructor(private diverService: DiverService, private authService: AuthService) { }

  ngOnInit(){
  console.log("ngOnInit");
  this.getDivers();
  }

  getDivers(){
  this.diverService.getDivers().subscribe(
    data => { this.divers = data},
    err => console.error(err),
    () => console.log('divers loaded')
  )
  }

  logout(){
    this.authService.logout();
}

}
