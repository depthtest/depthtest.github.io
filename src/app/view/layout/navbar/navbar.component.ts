import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageLanguage } from 'src/app/tools/page-language';
import { PageNavigation } from 'src/app/tools/page-navigation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public navpage: PageNavigation = PageNavigation.HOME;
  public pageEnum = PageNavigation;

  private curlanguage: string;
  public langEnum = PageLanguage;

  constructor(private translateService: TranslateService,
    private router: Router) {
      this.curlanguage = translateService.getDefaultLang();
      var auxLang = localStorage.getItem("JOW_LANGUAGE");
      if(auxLang != null && auxLang != this.curlanguage) {
        this.curlanguage = auxLang;
        this.changeLanguage(this.curlanguage);
      }

      this.router.events.subscribe(
        (event) => {
          if(event instanceof NavigationStart) {
            if(event.url === "/" || event.url.includes("home")) this.navpage = PageNavigation.HOME;
            else if(event.url.includes("publications")) this.navpage = PageNavigation.PUBLICATIONS;
            else if(event.url.includes("lecturing")) this.navpage = PageNavigation.LECTURING;
          }
        }
      );
  }

  ngOnInit(): void {}

  public isCurrentPage(item: PageNavigation): string {
    if(item == this.navpage) return "page";
    return "";
  }

  public isCurrentLanguage(lang: string): boolean {
    return lang == this.curlanguage;
  }

  public changeLanguage(lang: string): void {
    localStorage.setItem("JOW_LANGUAGE", lang);
    this.curlanguage = lang;
    this.translateService.use(lang);
  }

}
