import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeList } from 'src/app/core/interface/recipeInterface';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContent {}

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  @Input() editRecipe!: RecipeList;
  @Input() isAddRecipe!: boolean;

  @Output() createRecipe = new EventEmitter<RecipeList>();
  @Output() updateRecipe = new EventEmitter<RecipeList>();
  @Output() closeForm = new EventEmitter<boolean>();
  @Output() deleteRecipe = new EventEmitter<number>();

  addRecipeForm!: FormGroup;
  addIngredientForm!: FormGroup;
  ingredient: { ingredientName: string; ingredientQuantity: number }[] = [];
  check: { ingredientName: string; ingredientQuantity: number }[] = [];

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.createForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editRecipe']) {
      this.addRecipeForm.patchValue({ ...this.editRecipe });
    }
    if (changes['isAddRecipe'].currentValue) {
      this.addRecipeForm.reset();
    }
  }
  createForm() {
    this.addRecipeForm = this.fb.group({
      id: [''],
      foodName: ['', Validators.required],
      imgURL: [
        '',
        [
          Validators.required,
          Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/),
        ],
      ],
      alt: [''],
      description: [''],
    });

    this.addIngredientForm = this.fb.group({
      ingredientName: ['', Validators.required],
      ingredientQuantity: ['', Validators.required],
    });
  }

  handleSubmitAddRecipe() {
    this.addRecipeForm.patchValue({
      alt: this.addRecipeForm.get('foodName')?.value,
    });
    if (this.isAddRecipe) {
      this.createRecipe.emit(this.addRecipeForm.value);
      this.addRecipeForm.reset();
    } else {
      this.updateRecipe.emit(this.addRecipeForm.value);
    }
  }

  handleCancelRecipeForm() {
    this.closeForm.emit(false);
    this.addRecipeForm.reset();
  }

  handleDeleteRecipe() {
    const dialogRef = this.dialog.open(DialogContent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteRecipe.emit(this.addRecipeForm.get('id')?.value);
      }
    });
  }

  handleAddIngredient() {
    this.ingredient.push({
      ingredientName: '',
      ingredientQuantity: 1,
    });
    this.addIngredientForm.reset();
  }

  handleDeleteIngredient(ingredientName: string) {
    console.log(this.ingredient.values);
  }

  get foodName() {
    return this.addRecipeForm.get('foodName');
  }
  get imgURL() {
    return this.addRecipeForm.get('imgURL');
  }
}
