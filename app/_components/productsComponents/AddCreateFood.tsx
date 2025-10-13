"use client";
import { useEffect, useState } from "react";
import { addFoodHandler } from "../_utils/AddFoodHandler";
type FoodSchematype = {
  _id: string;
  name: string;
  price: string;
  ingredients: string;
  image: string;
};

export default function AddCreateFood() {
  const [foods, setFoods] = useState<FoodSchematype[]>([]);

  const getFoods = async () => {
    const result = await fetch("http://localhost:8000/api/food");
    const responseData = await result.json();
    console.log({ responseData });
    const { data } = responseData;
    console.log(data);
    setFoods(responseData.data);
  };

  useEffect(() => {
    getFoods();
  }, []);

  // // Шинэ хоол нэмэх үед
  // const handleAddFood = async (foodData: {
  //   name: string;
  //   price: string;
  //   image: File;
  //   ingredients: string;
  //   category: string;
  // }) => {
  //   await addFoodHandler(
  //     foodData.name,
  //     foodData.price,
  //     foodData.image,
  //     foodData.ingredients,
  //     foodData.category,
  //     getFoods // энд getFoods-ийг дамжуулж байна
  //   );
  // };

  return (
    <>
      {foods.map((food) => (
        <div
          key={food._id}
          className=" w-[270px] h-[241px] rounded-[20px] border-1"
        >
          <div className="m-4">
            {/* Image */}
            <div className="w-full h-[129px] bg-gray-100 rounded-[12px] relative">
              {/* {food.image} */}
              <img className="absolute m-5 justify-items-end" src="edit.svg" />
            </div>
            {/* Image end */}
            {/* Detail */}
            <div className="flex items-center justify-between">
              <div>{food.name}</div>
              <div>{food.price}</div>
            </div>
            <div>{food.ingredients}</div>
            // {/* Detail end */}
          </div>
        </div>
      ))}
    </>
  );
}
