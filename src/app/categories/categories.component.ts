import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray: Category[] = [];
  formCategory:any;
  formStatus:any ='Add';

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val: { id: string; data: unknown; }[]) => {
      console.log(val);
      this.categoryArray = val.map((item: { id: string; data: unknown; }) => item.data as Category);
    });
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category
    };

    this.categoryService.saveData(categoryData);
    formData.reset();
  }

  onEdit(category:any){
    this.formCategory = category;
    this.formStatus ='Edit'
    
  }
}
