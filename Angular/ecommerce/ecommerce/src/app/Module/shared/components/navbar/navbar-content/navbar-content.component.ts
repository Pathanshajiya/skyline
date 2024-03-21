import { Component,Input} from '@angular/core';
import { navigation} from './navbarMenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-content',
  templateUrl: './navbar-content.component.html',
  styleUrls: ['./navbar-content.component.scss']
})
export class NavbarContentComponent {
  @Input()
  selectedSection!: string;
 category:any;
 ngOnInit() {
    
  }
   constructor(private router:Router){
    this.category=navigation
  }
 navigateToProducts=(path:String)=>{
    this.router.navigate([path])
    
  } 
}
