"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

                <DialogContent className="inter w-115 ">
                  <div className="font-bold text-lg">Dishes info</div>

                  <DialogHeader>
                    <>
                      <div className="mt-6 flex">
                        <div className="text-xs font-normal mb-3 mt-3 w-[120px] text-muted-foreground">
                          Dish name
                        </div>

                        <Input
                          placeholder="Type food name"
                          // value={name}
                          // onChange={nameChangeHandler}
                        />
                      </div>

                      {/*  */}
                      <div className="mt-3 flex">
                        <div className="text-xs font-normal mb-3 mt-3 w-[120px] text-muted-foreground">
                          Dish category
                        </div>

                        <Input
                          placeholder="Type food name"
                          // value={name}
                          // onChange={nameChangeHandler}
                        />
                      </div>

                      {/*  */}
                      <div className="mt-3 w-[412px] flex">
                        <div className="text-xs font-normal mb-3 mt-3 w-[120px] text-muted-foreground">
                          Ingredients
                        </div>
                        <Input
                          placeholder="List ingredients..."
                          className="h-[80px]"
                          type="text"
                          // value={ingredients}
                          // onChange={ingredientsChangeHandler}
                        />
                      </div>

                      <div className="mt-3 flex">
                        <div className="text-xs font-normal mb-3 mt-3 w-[120px] text-muted-foreground">
                          Price
                        </div>

                        <Input
                          placeholder="Enter price..."
                          // defaultValue={0}
                          // value={price}
                          // onChange={priceChangeHandler}
                          type="number"
                        />
                      </div>

                      {/*  */}
                      <div className="mt-3 w-[412px] flex justify-between">
                        <div className="text-xs font-normal mb-3 mt-3 w-[120px] text-muted-foreground">
                          Image
                        </div>
                        <Input
                          className="h-[138px] bg-blue-50 border-1 border-dashed border-blue-200 rounded-md text-sm font-medium mx-auto "
                          id="picture"
                          type="file"
                          accept="image/*"
                          // onChange={fileChangeHandler}
                          placeholder="Choose a file or drag & drop it here"
                        ></Input>
                      </div>

                      <DialogTitle>
                        <Button
                          // onClick={creareFoodHandler}
                          className="w-[93px] h-[40px] bg-black text-white mt-[24px] ml-[319px]"
                          variant="outline"
                        >
                          Add Dish
                        </Button>
                      </DialogTitle>
                      <DialogDescription></DialogDescription>
                    </>
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
