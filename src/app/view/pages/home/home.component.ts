import { Component, OnInit } from '@angular/core';
import { PersonalAffiliation } from 'src/app/models/personal-affiliation';
import { PersonalBio } from 'src/app/models/personal-bio';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public affiliation: PersonalAffiliation = new PersonalAffiliation();
  public biography: PersonalBio = new PersonalBio();

  constructor() {}

  ngOnInit(): void {}

}
