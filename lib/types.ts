export type FoodSchematype = {
  _id: string;
  name: string;
  price: string;
  ingredients: string;
  image: string;
};

export type AddCreateFoodProps = {
  foods: FoodType[];
  category: Category;
  refetchFoods: () => Promise<void>;
};


export type FoodType = {
  _id?: string;
  name: string;
  price: number;
  ingredients: string;
  image: string;
  categoryId: Category;
};

export type Category ={
  name: string;
  _id: string;
}
