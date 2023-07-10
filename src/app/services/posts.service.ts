import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private storage:AngularFireStorage,
    private service :AngularFirestore,
    private toastr :ToastrService,
    private router: Router,
    ) { }

   uploadImage(selectedImage:any,postData:any){
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath,selectedImage).then(() => {
      console.log('post image uploaded successfully');

      this.storage.ref(filePath).getDownloadURL().subscribe(URL =>{
        // console.log(URL);
        postData.postImgPath = URL;
        console.log(postData);

        this.saveData(postData); 
        
      });
    });
    
   }
  
   saveData(postData:any){
    this.service.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Data Insert Successfully');
      this.router.navigate(['/posts']);
    });
   }


   loadData() {
    return  this.service.collection('posts').snapshotChanges().pipe(
       map(actions => {
        return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return {id, data}
 
         })
       })
     )
   }
   

}
