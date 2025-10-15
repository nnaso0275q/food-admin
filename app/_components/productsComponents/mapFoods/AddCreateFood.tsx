"use client";
import { useEffect, useState } from "react";
import { Pen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    const data = await result.json();
    setFoods(data.data);
  };

  useEffect(() => {
    getFoods();
  }, []);

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
                className="w-full h-full object-cover "
              />

              <Dialog>
                <DialogTrigger>
                  <img
                    src="edit.svg"
                    className="absolute top-2 h-11 w-11 m-3"
                  />
                </DialogTrigger>
                <DialogContent className="inter w-115 m-6">
                  <div className="font-bold text-lg">Dishes Info</div>
                  <DialogHeader>
                    <DialogTitle className="mt-3 mb-3">
                      
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
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
