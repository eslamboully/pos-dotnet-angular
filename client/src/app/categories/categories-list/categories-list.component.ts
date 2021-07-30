import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgbdSortableHeader, SortEvent } from 'src/app/_directives/sortable.directive';
import { Category } from 'src/app/_models/Category';
import { CategoriesService } from 'src/app/_services/categories.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  categories: any[];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public categoriesService:CategoriesService,public translate: TranslateService,private toastr: ToastrService) {
    categoriesService.getCategories().subscribe(categories => {
      this.categories = categories.map(
        (category) => {
          return {
            id: category.id,
            name: category.categoryTranslations?.find(c => c.locale === this.translate.currentLang)?.name
          }
        }
      );
      console.log(this.categories);
    });

  }

  ngOnInit(): void {

  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // this.service.sortColumn = column;
    // this.service.sortDirection = direction;
  }
  
  destroy(id: number) {
    if (confirm("Are You Sure ?")) {
      this.categoriesService.deleteCategory(id).subscribe(() => {
        this.categories = this.categories.filter(category => category.id != id);
        this.toastr.success("Deleted Successfully");
      });   
    }
  }

}
