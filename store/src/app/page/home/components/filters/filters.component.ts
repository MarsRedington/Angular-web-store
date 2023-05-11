import { Component, EventEmitter, OnInit, Output, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();

  public categories: Array<string> | undefined;
  public categoriesSubscription: Subscription | undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  public getCategories(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((_categories) => (this.categories = _categories));
  }

  public onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
