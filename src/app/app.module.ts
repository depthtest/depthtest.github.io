import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ScullyLibModule } from '@scullyio/ng-lib';

import { filter } from 'rxjs/operators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './view/layout/navbar/navbar.component';
import { FooterComponent } from './view/layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    ScullyLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  //Check for SCROLLING
  //https://medium.com/@qun.do19/how-to-enable-anchor-scrolling-of-angular-router-in-the-right-way-42e9b19657b5
  constructor(private _router: Router, private _scroller: ViewportScroller) {
    this._scroller.setOffset([0, 50]);
    this._router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
      if (e.anchor) {
        // anchor navigation
        /* setTimeout is the core line to solve the solution */
        setTimeout(() => {
          this._scroller.setOffset([0, 70]);
          this._scroller.scrollToAnchor(e.anchor);
          this._scroller.setOffset([0, 0]);
        })
      } else if (e.position) {
        // backward navigation
        this._scroller.scrollToPosition(e.position);
        this._scroller.setOffset([0, 0]);
      } else {
        // forward navigation
        this._scroller.scrollToPosition([0, 65]);
        this._scroller.setOffset([0, 0]);
      }
    });
  }

}

//AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}