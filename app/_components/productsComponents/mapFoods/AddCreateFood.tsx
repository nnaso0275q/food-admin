"use client";
import { useEffect, useState } from "react";
import UpdateFoodById from "./UpdateFoodById";
type FoodSchematype = {
  _id: string;
  name: string;
  price: string;
  ingredients: string;
  image: string;
};

export default function AddCreateFood() {
  const [foods, setFoods] = useState<FoodSchematype[]>([]);

  // Hool tatah
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

  // Patch huselt
  const pathUpdateFood = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/food/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: "shine hoolnii ner",
          price: "25000",
        }),
      });
      if (!res.ok) throw new Error("Update failed");
      //   const data = await res.json()
      // console.log("Updated", data)

      getFoods();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {foods?.map((food) => (
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
              <img
                src="edit.svg"
                onClick={() => UpdateFoodById}
                className="absolute top-2 h-11 w-11 m-3"
                // onClick={()=>pathUpdateFood(food._id)}
              />
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
