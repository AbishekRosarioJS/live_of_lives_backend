import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private service:AngularFirestore) { }

  saveData(data: any){

    this.service.collection('categories').add(data).then(docRef =>  {
      console.log(docRef);
    })
    .catch(err=> {console.log(err) })
  }
}
