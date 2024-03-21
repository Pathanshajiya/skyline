import { Component, HostListener } from '@angular/core';
import {
  MatDialog,
  
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, createSelector, select } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';
import { UserService } from 'src/app/state/User/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthComponent } from 'src/app/Module/auth/auth.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isProfileMenuOpen: boolean = false;
  userProfile: any;

  dialogRef?: MatDialogRef<AuthComponent>;

  selectUser = createSelector(
    (state: AppState) => state.user,
    (user) => user
  );

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>,
    private userService:UserService,
    private _snackBar: MatSnackBar
  ) {}

  handleProfileMenuOpen() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    console.log('handle profile menu');
  }

  handleProfileMenuClose() {
    this.isProfileMenuOpen = false;
  }

  openLoginModal(): void {
    this.dialog.open(AuthComponent, {
      width: '400px',
      disableClose: false,
    });
  }

  navigateToCart = () => {
    this.router.navigate(['cart']);
  };
  ngOnInit() {
    if (localStorage.getItem('jwt')) this.userService.getUserProfile()
this.store.pipe(select((store:AppState)=>store.user)).subscribe((user)=>{
      this.userProfile=user.userProfile;
      if(user.userProfile){
        this.dialog.closeAll()
              }
  })  
  }

  dispatchGetUserProfileAction=()=>{
    this.userService.getUserProfile()
  };

  handleLogout = () => {
    console.log('logout success');
    this.userService.logout();
    this.router.navigate(['/']);
    
  };

  open: boolean = false;
  selectedTabIndex: number = 0;

  setOpen(open: boolean): void {
    this.open = open;
  }

  isNavbarContentOpen = false;
  currentSection!: string;

  openNavbarContent(section: string) {
    this.isNavbarContentOpen = true;
    this.currentSection = section;
    console.log('currentSection section ', this.currentSection);
  }

  closeNavbarContent() {
    this.isNavbarContentOpen = false;
  }
  navigateTo(path:any){
    this.router.navigate([path])
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const modalContainer = document.querySelector('.modal-container');
    const openButtons = document.querySelectorAll('.open-button');

    let clickedInsideButton = false;

    openButtons.forEach((button: Element) => {
      if (button.contains(event.target as Node)) {
        clickedInsideButton = true;
      }
    });

    if (modalContainer && !clickedInsideButton && this.isNavbarContentOpen) {
      console.log(
        'container ',
        this.isNavbarContentOpen
      );
      this.closeNavbarContent();
    }
  }
}
