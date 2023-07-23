import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private service: AngularFirestore,private toastr:ToastrService) { }

  loadData() {
    return  this.service.collection('subscribers').snapshotChanges().pipe(
       map(actions => {
        return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return {id, data}
 
         })
       })
     )
   }

   deleteData(id:any) {
    this.service.doc(`subscribers/${id}`).delete().then(docRef =>{
      this.toastr.success('Data Deleteed Successfully ...!');
    })
  }

}
