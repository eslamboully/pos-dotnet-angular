import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/_services/categories.service';
import { DbtransoptionsService } from 'src/app/_services/dbtransoptions.service';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {

  model: any = {categoryTranslations: this.transoptions.languages};
  constructor(private categoriesService: CategoriesService,
    private router:Router,private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,public transoptions: DbtransoptionsService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  updateCategory() {
    this.categoriesService.updateCategory(this.model).subscribe(category => {
      this.router.navigateByUrl('/dashboard/categories');
      this.toastr.success('Updated Successfully');
    });
  }

  getCategory() {
    var categoryId: number = +this.activatedRoute.snapshot.paramMap.get('id');
    this.categoriesService.getCategory(categoryId).subscribe(category => {
      this.model = category;
    });
  }

}
