import subjects from '../../assets/data/lecturing.json';
import { LecturingStatus } from '../tools/lecturing-status';
import { Subject } from './subject';

export class Subjects {
    private _subs:any = subjects;

    private _subjects: Subject[];
    private _lecturingStatus = LecturingStatus;

    constructor() {
        this._subjects = [];
        for(let i=0; i<this._subs.subjects.length; i++) {
            this._subjects.push(new Subject());
            this._subjects[i].loadData(this._subs.subjects[i]);
        }
    }

    get subjects(): Subject[] {
        return this._subjects;
    }

    getTeachingType(): string[] {
        let typeSet: Set<string> = new Set<string>();
        for(let i=0; i<this._subjects.length; i++) {
            typeSet.add(this._subjects[i].type);
        }
        let types: string[] = Array.from(typeSet).sort(
            (a: string, b: string) => {
                if(a < b) return 1;
                return -1;
            }
        );
        return types;
    }

    getSubjectsByTypeAndStatus(type: string, status: string): Subject[] {
        let subs: Subject[] = [];
        subs = this._subjects.filter(
            (sub: Subject) => {
                return sub.type == type && sub.status == status;
            }
        );

        subs.sort(
            (a: Subject, b: Subject) => {
                if(a.lastYear < b.lastYear) return 1;
                return -1;
            }
        );
        return subs;
    }
    
}
