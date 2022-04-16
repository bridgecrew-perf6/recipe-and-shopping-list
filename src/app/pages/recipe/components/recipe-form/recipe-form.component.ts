import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  // ingredient: { ingredientName: string; ingredientQuantity: number }[] = [];

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.createForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editRecipe']) {
      this.addRecipeForm?.patchValue({
        ...this.editRecipe,
      });
      if (
        this.editRecipe?.ingredient?.length !== 0 &&
        typeof this.editRecipe?.ingredient != 'undefined'
      ) {
        for (let ingredient of this.editRecipe?.ingredient) {
          (<FormArray>this.addRecipeForm?.get('ingredient')).push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
            })
          );
        }
      }
    }
    if (changes['isAddRecipe'].currentValue) {
      this.addRecipeForm.reset();
      this.resetIngredientForm();
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
      ingredient: new FormArray([]),
    });
  }

  handleSubmitAddRecipe() {
    this.addRecipeForm.patchValue({
      alt: this.addRecipeForm.get('foodName')?.value,
    });
    if (this.isAddRecipe) {
      this.createRecipe.emit(this.addRecipeForm.value);
    } else {
      this.updateRecipe.emit(this.addRecipeForm.value);
    }
    this.addRecipeForm.reset();
    this.resetIngredientForm();
  }

  handleCancelRecipeForm() {
    this.closeForm.emit(false);
    this.addRecipeForm?.reset();
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
    (<FormArray>this.addRecipeForm.get('ingredient')).push(
      new FormGroup({
        name: new FormControl(null),
        amount: new FormControl(null),
      })
    );
  }

  handleDeleteIngredient(ingredientName: any) {
    const { name, value } = ingredientName.value;
    (<FormArray>this.addRecipeForm.get('ingredient')).removeAt(
      (<FormArray>this.addRecipeForm.get('ingredient')).value.findIndex(
        (nameItem: any) => nameItem.name == name
      )
    );
  }

  get foodName() {
    return this.addRecipeForm.get('foodName');
  }
  get imgURL() {
    return this.addRecipeForm.get('imgURL');
  }
  getControls() {
    return (<FormArray>this.addRecipeForm.get('ingredient'))?.controls;
  }

  private resetIngredientForm() {
    while ((<FormArray>this.addRecipeForm?.get('ingredient')).length !== 0) {
      (<FormArray>this.addRecipeForm?.get('ingredient')).removeAt(0);
    }
  }
}
