import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private service:AngularFirestore, private toastr : ToastrService) { }

  saveData(data: any){

    this.service.collection('categories').add(data).then(docRef =>  {
      console.log(docRef);
    this.toastr.success('Data Insert Successfully...!')
    })
    .catch(err=> {console.log(err) })
  }

  loadData() {
   return  this.service.collection('categories').snapshotChanges().pipe(
      map(actions => {
       return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}

        })
      })
    )
  }


  updateData (id:any, EditData:any) {
      this.service.doc(`categories/${id}`).update(EditData).then(docRef => {
      this.toastr.success('Data Updateed Successfully ...!');
    })
  }

  deleteData(id:any) {
    this.service.doc(`categories/${id}`).delete().then(docRef =>{
      this.toastr.success('Data Deleteed Successfully ...!');
    })
  }

}
