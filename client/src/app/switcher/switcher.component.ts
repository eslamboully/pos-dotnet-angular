import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css']
})
export class SwitcherComponent implements OnInit {


  themename: string;
  themedir: string;
  currentDirection: string = localStorage.getItem('locale') || 'rtl';
  
  constructor(private route: ActivatedRoute,private translate: TranslateService) { }

  ngOnInit(): void {
      this.setLocale();
      this.route.queryParams
      .subscribe(params => {
        // console.log(params);
        
        if(params.direction =="undefined" || params.direction == "" || params.direction == null) {
            this.themedir = 'ltr';
        } else {
            console.log(params.direction);
            this.themedir = params.direction;
        }
        
        if(params.themename !="" && (params.themename <= 5 && params.themename > 0)) {
            this.themename = 'dezThemeSet'+params.themename;
            this.themeDemoSettings(this.themename, this.themedir);
        }
        
      });
  }
  
  
    toggleswitcher: boolean = true;
    togglesthemedemo: boolean = true;
  
    toggleswitcherwindow() {
		this.toggleswitcher = !this.toggleswitcher;
	}
    
    togglesthemedemowindow() {
		this.togglesthemedemo = !this.togglesthemedemo;
	}
    
    
    themeSettings(attributeName, attributeVal) {
        document.body.setAttribute(attributeName, attributeVal);
        
        if(attributeName == 'direction') {
            document.getElementsByTagName('html')[0].setAttribute('dir', attributeVal);
            document.getElementsByTagName('html')[0].setAttribute('class', attributeVal);

            this.currentDirection = attributeVal;
            localStorage.setItem('locale',attributeVal);
            this.translate.use(this.currentDirection == 'rtl' ? 'ar' : 'en');
        }
    }
    
    
    themeDemoSettings (theme, direction) {
        var themeVar = eval(theme);
        
         document.body.setAttribute('data-typography', themeVar.typography);
         document.body.setAttribute('data-theme-version', themeVar.version);
         document.body.setAttribute('data-layout', themeVar.layout);
         document.body.setAttribute('data-primary', themeVar.primary);
         document.body.setAttribute('data-headerbg', themeVar.headerBg);
         document.body.setAttribute('data-nav-headerbg', themeVar.navheaderBg);
         document.body.setAttribute('data-sibebarbg', themeVar.sidebarBg);
         document.body.setAttribute('data-sidebar-style', themeVar.sidebarStyle);
         document.body.setAttribute('data-sidebar-position', themeVar.sidebarPosition);
         document.body.setAttribute('data-header-position', themeVar.headerPosition);
         document.body.setAttribute('data-container', themeVar.containerLayout);
         document.body.setAttribute('direction', direction);
            
        document.getElementsByTagName('html')[0].setAttribute('dir', direction);
        document.getElementsByTagName('html')[0].setAttribute('class', direction);

    
    
    }

    setLocale () {
        document.body.setAttribute('direction', this.currentDirection);
        document.getElementsByTagName('html')[0].setAttribute('dir', this.currentDirection);
        document.getElementsByTagName('html')[0].setAttribute('class', this.currentDirection);
        this.translate.use(this.currentDirection == 'rtl' ? 'ar' : 'en');
    }
    

}
