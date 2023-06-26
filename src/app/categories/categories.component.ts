import { Component ,OnInit} from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  constructor(private service:AngularFirestore) {}

  ngOnInit(): void {
    
  }

  onSubmit(formData: any){
    
    let categoryData = {
      category:formData.value.category
    }
    this.service.collection('categories').add(categoryData).then(docRef =>  {
      console.log(docRef);
    })
    .catch(err=>{
      console.log(err)
    })
  }

}
