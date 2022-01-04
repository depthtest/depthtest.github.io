import publications from '../../assets/data/publications.json';
import { Publication } from './publication';

export class Publications {
    private _publis:any = publications;
    
    private _publications: Publication[];

    constructor() {
        this._publications = [];
        for(let i=0; i<this._publis.publications.length; i++) {
            this._publications.push(new Publication());
            this._publications[i].loadData(this._publis.publications[i]);
        }
    }

    get publications(): Publication[] {
        return this._publications;
    }

    getPublicationYears(): number[] {
        let yearsSet: Set<number> = new Set<number>();
        for(let i=0; i<this._publications.length; i++) {
            yearsSet.add(this._publications[i].year);
        }
        let years: number[] = Array.from(yearsSet).sort(
            (a: number, b: number) => {
                if(a < b) return 1;
                return -1;
            }
        );
        return years;
    }

    getPublicationsByYear(year: number): Publication[] {
        let publis: Publication[] = [];
        publis = this._publications.filter(
            (publi: Publication) => {
                return publi.year == year;
            }
        );
        publis.sort(
            (a: Publication, b: Publication) => {
                if(a.publicationDate < b.publicationDate) return 1;
                return -1;
            }
        );
        return publis;
    }

    getPublicationById(id: string): Publication {
        let publi: Publication;
        publi = this._publications.find(
            (publiElem: Publication) => {
                return publiElem.id == id;
            }
        ) || new Publication();

        return publi;
    }
}
