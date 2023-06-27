import { Component ,OnInit} from '@angular/core';
import { CategoriesService } from '../services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  constructor(private categoryService :CategoriesService) {}

  ngOnInit(): void {
    
  }

  onSubmit(formData: any){
    
    let categoryData = {
      category:formData.value.category

    }

    this.categoryService.saveData(categoryData)

}

}