import { Component ,OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

    let SubcategoryData = {
      subcategory:formData.value.category

    }

    this.service.collection('categories').add(categoryData).then(docRef =>  {
      console.log(docRef);

      this.service.collection('categories').doc(docRef.id).collection('subcategories').add(SubcategoryData).then(docref1=>{
        console.log(docref1);
      })
    })
    .catch(err=> {console.log(err) })
  }


}
