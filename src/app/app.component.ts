import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'es', 'ca']);
    let locale = navigator.language;
    if(this.translateService.langs.indexOf(locale) == -1)
      translateService.setDefaultLang('en');
    else translateService.setDefaultLang(locale);
  }
}
