import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Publication } from 'src/app/models/publication';
import { PersonalDataService } from 'src/app/services/personal-data.service';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.css']
})
export class GeneralViewComponent implements OnInit {
  @ViewChildren('jowPubBinding') pubsBinding!: QueryList<ElementRef>;

  constructor(private _pdService: PersonalDataService,
              private _router: Router,
              private _viewportScroller: ViewportScroller) {
    
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this._router.events.subscribe(
      (event) => {
        if(event instanceof NavigationEnd) {
          const treeRoute = this._router.parseUrl(this._router.url);
          if(treeRoute.fragment) {
            const fragment = treeRoute.fragment?.replace('.', "\.").replace("-", "\-");
            this._viewportScroller.scrollToAnchor(fragment);
            /*this.pubsBinding.find(
              (pub: ElementRef) => {
                console.log(pub.nativeElement.id);
                if(pub.nativeElement.id == fragment) {
                  const element: HTMLElement = pub.nativeElement as HTMLElement;
                  element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
                  return true;
                }
                return false;
              }
            );*/
          }
        }
      }
    );
  }

  getPublicationYears(): number[] {
    return this._pdService.getPublicationYears();
  }

  getPublicationsByYear(year: number): Publication[] {
    return this._pdService.getPublicationsByYear(year);
  }

}
