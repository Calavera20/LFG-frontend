import { Component, HostListener } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  @HostListener("window:onbeforeunload",["$event"])
  clearLocalStorage(event){
      localStorage.clear();
  }

  title = 'working-title-LFG';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'home',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/icon-home2.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'login',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/login.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'logout',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/logout.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'manage-accounts',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/manage_accounts.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'search',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/search.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'refresh',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/svg/refresh.svg'
      )
    );

    
  }
}
