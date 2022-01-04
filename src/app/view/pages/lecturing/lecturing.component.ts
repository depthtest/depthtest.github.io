import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { PersonalDataService } from 'src/app/services/personal-data.service';
import { LecturingStatus } from 'src/app/tools/lecturing-status';
import { LecturingType } from 'src/app/tools/lecturing-type';

@Component({
  selector: 'app-lecturing',
  templateUrl: './lecturing.component.html',
  styleUrls: ['./lecturing.component.css']
})
export class LecturingComponent implements OnInit {

  public lecturingType = LecturingType;
  public lecturingStatus = LecturingStatus;

  constructor(private _pdService: PersonalDataService) {}

  ngOnInit(): void {}

  getSubjectsByType(type: string, status: string): Subject[] {
    return this._pdService.getSubjectsByType(type, status);
  }

}
