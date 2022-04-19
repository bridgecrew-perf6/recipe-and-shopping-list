export interface RecipeList {
  id: number;
  foodName: string;
  imgURL: string;
  alt: string;
  description: string;
  ingredient: ListIngredient[];
}

interface ListIngredient {
  name: string;
  amount: number;
}
