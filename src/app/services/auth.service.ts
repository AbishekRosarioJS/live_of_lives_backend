import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private afAuth:AngularFireAuth,private toaster :ToastrService,private router: Router) { }

  login(email:any,password:any){
    this.afAuth.signInWithEmailAndPassword(email,password).then(()=>{
      this.toaster.success('Logged In Successfully');
      this.loadUser();
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }).catch(e=>{
      this.toaster.warning(e);
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe(user=>{
      // console.log(JSON.parse(JSON.stringify(user)));

      localStorage.setItem('user',JSON.stringify(user));
      
    });
  }
  

  logOut(){
    this.afAuth.signOut().then(()=>{
      this.toaster.success('User Logged Out Sucessfully');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }


}
