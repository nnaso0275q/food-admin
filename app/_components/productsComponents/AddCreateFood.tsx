"use client";
import { useEffect, useState } from "react";
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

  return (
    <>
      {foods.map((food) => (
        <div
          key={food._id}
          className="w-[270px] h-[241px] rounded-[20px] border border-gray-200"
        >
          <div className="m-4">
            {/* Image */}
            <div className="relative w-full h-[129px] rounded-[12px] overflow-hidden bg-gray-100">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />

              {/* edit.svg */}
              <img src="edit.svg" className="absolute top-2 h-11 w-11 m-3" />
            </div>

            {/* Detail */}
            <>
              <div className="flex items-center justify-between mt-5">
                <div className="text-red-500">{food.name}</div>
                <div>{food.price}</div>
              </div>
              <div>{food.ingredients}</div>
            </>
          </div>
        </div>
      ))}
    </>
  );
}
