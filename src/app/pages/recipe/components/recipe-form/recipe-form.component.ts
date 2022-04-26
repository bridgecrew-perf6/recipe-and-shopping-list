import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { RecipeList } from 'src/app/core/model/recipe.model';
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
  recipeListDup = new Subject<string>();
  isDuplicate!: boolean;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.createForm();
    this.recipeListDup
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.isDuplicate = false;
        const lengthIngredient = (<FormArray>(
          this.addRecipeForm.get('ingredient')
        )).value.length;
        const newInput = (<FormArray>this.addRecipeForm.get('ingredient'))
          .value[lengthIngredient - 1];
        for (let i = 0; i < lengthIngredient - 1; i++) {
          if (
            newInput.name ==
            (<FormArray>this.addRecipeForm.get('ingredient')).value[i].name
          ) {
            this.isDuplicate = true;
          }
        }
      });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    const isHasIngredient =
      this.editRecipe?.ingredient?.length !== 0 &&
      typeof this.editRecipe?.ingredient !== 'undefined';

    if (changes['editRecipe']) {
      this.addRecipeForm?.patchValue({
        ...this.editRecipe,
      });
      if (isHasIngredient) {
        for (let ingredient of this.editRecipe?.ingredient) {
          (<FormArray>this.addRecipeForm?.get('ingredient')).push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.min(1),
              ]),
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
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      })
    );
  }

  handleDeleteIngredient(ingredientName: any) {
    this.isDuplicate = false;
    const { name } = ingredientName.value;
    (<FormArray>this.addRecipeForm.get('ingredient')).removeAt(
      (<FormArray>this.addRecipeForm.get('ingredient')).value.findIndex(
        (nameItem: { name: string; amount: string }) => nameItem.name === name
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
  get allRecipe() {
    return (<FormArray>this.addRecipeForm.get('ingredient'))?.value;
  }

  private resetIngredientForm() {
    while ((<FormArray>this.addRecipeForm?.get('ingredient')).length !== 0) {
      (<FormArray>this.addRecipeForm?.get('ingredient')).removeAt(0);
    }
  }
}
