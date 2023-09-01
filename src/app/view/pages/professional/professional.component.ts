import { Component } from '@angular/core';
import { Position } from 'src/app/models/position';
import { PersonalDataService } from 'src/app/services/personal-data.service';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent {

  constructor(private _pdService: PersonalDataService) {}

  get positions(): Position[] {
    return this._pdService.positions;
  }

}
