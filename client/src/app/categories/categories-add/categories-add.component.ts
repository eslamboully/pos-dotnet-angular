import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/_models/Category';
import { CategoriesService } from 'src/app/_services/categories.service';
import { DbtransoptionsService } from 'src/app/_services/dbtransoptions.service';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit {

  model: any = {categoryTranslations: this.transoptions.languages};
  constructor(private categoriesService: CategoriesService,private router:Router
    ,private toastr: ToastrService,public transoptions: DbtransoptionsService) { }

  ngOnInit(): void {
  }

  storeCategory() {
    this.categoriesService.storeCategory(this.model).subscribe(user => {
      this.router.navigateByUrl('/dashboard/categories');
      this.toastr.success('Added Successfully');
    });
  }
}
