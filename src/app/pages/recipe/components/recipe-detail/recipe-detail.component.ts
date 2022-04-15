import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeList } from 'src/app/core/interface/recipeInterface';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() detailRecipe!: RecipeList[];
  @Output() editDetailRecipe = new EventEmitter<RecipeList>();
  constructor() {}

  ngOnInit(): void {}

  handleEditRecipe() {
    this.editDetailRecipe.emit(this.detailRecipe[0]);
  }
}
