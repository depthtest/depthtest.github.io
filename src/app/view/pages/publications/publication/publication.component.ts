import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Publication } from 'src/app/models/publication';
import { PersonalDataService } from 'src/app/services/personal-data.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  public publication: Publication;

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _pdService: PersonalDataService) {
    this.publication = new Publication();
    this._activatedRoute.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        if (id == null) {
          this._router.navigate(['publications']);
        }
        this.publication = this._pdService.getPublicationById(id);
        if(this.publication.id == "") this._router.navigate(['publications']);
      }
    );
  }

  ngOnInit(): void {}

  goBack(): void {
    this._router.navigateByUrl("/publications#" + this.publication.id);


    //https://stackoverflow.com/questions/50836497/using-html-anchor-link-id-in-angular-6
    //https://www.geekstrick.com/fragment-url-in-angular-8/
    //https://www.youtube.com/watch?v=mMzBzb3Pgqo
  }

}
