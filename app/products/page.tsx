"use client";
import { AdminLayout } from "../_components/pageComponents/AdminLayout";
import AddCreateFood from "../_components/productsComponents/mapFoods/AddCreateFood";
import CreateFoodDialog from "../_components/productsComponents/CreateFoodDialog";
import DishesCategory from "../_components/productsComponents/DishesCategory";
import { useEffect, useState } from "react";
import { Category, FoodType } from "@/lib/types";

export default function ProductPage() {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const getFoods = async () => {
    const result = await fetch("http://localhost:8000/api/food");
    const responseData = await result.json();
    setFoods(responseData.data);
  };
  const getCategories = async () => {
    try {
      const result = await fetch("http://localhost:8000/api/categories");
      const responseData = await result.json();
      console.log({ responseData });
      const { data } = responseData;
      setCategories(data);
    } catch (err) {
      console.error;
    }
  };

  useEffect(() => {
    getFoods();
  }, []);
  return (
    <AdminLayout>
      <DishesCategory />
      <div className="bg-white w-full h-fit rounded-xl mt-6">
        <div className="p-5">
          <div className="flex gap-4 flex-wrap">
            {categories.map((categor) => (
              <CreateFoodDialog title={categor.name}></CreateFoodDialog>
            ))}

            {categories.map((category) => (
              <AddCreateFood
                foods={foods.filter(
                  (food) => food.categoryId._id == category._id
                )}
                category={category}
                refetchFoods={() => getFoods()}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
