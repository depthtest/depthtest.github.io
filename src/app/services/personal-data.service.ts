import { Injectable } from '@angular/core';
import { Publication } from '../models/publication';
import { Publications } from '../models/publications';
import { Subject } from '../models/subject';
import { Subjects } from '../models/subjects';
import { Professional } from '../models/professional';
import { Position } from '../models/position';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {

  private _professional: Professional;
  private _publications: Publications;
  private _subjects: Subjects;

  constructor() {
    this._professional = new Professional();
    this._publications = new Publications();
    this._subjects = new Subjects();
  }

  get professional(): Professional {
    return this._professional;
  }

  get positions(): Position[] {
    return this._professional.positions;
  }

  get publications(): Publications {
    return this._publications;
  }

  getPublicationYears(): number[] {
    return this._publications.getPublicationYears();
  }

  getPublicationsByYear(year: number): Publication[] {
    return this._publications.getPublicationsByYear(year);
  }

  getPublicationById(id: string): Publication {
    return this._publications.getPublicationById(id);
  }

  getSubjectsByType(type: string, status: string): Subject[] {
    return this._subjects.getSubjectsByTypeAndStatus(type, status);
  }

}
