"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Category, FoodType } from "@/lib/types";
import { ChangeEvent, useEffect, useState } from "react";
import CreateFoodDialog from "./CreateFoodDialog";
import AddCreateFood from "./mapFoods/AddCreateFood";
import Image from "next/image";

export default function DishesCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [foods, setFoods] = useState<FoodType[]>([]);

  console.log("foods", foods);

  const getCategories = async () => {
    const result = await fetch("http://localhost:8000/api/categories");
    const responseData = await result.json();
    console.log("responseData", { responseData });

    const { data } = responseData;
    setCategories(data);
    console.log("data", data);
  };

  const getFoods = async () => {
    const result = await fetch("http://localhost:8000/api/food");
    const responseData = await result.json();
    setFoods(responseData.data);
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  const newCategoryNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };
  const createCategoryHandler = async () => {
    await fetch("http://localhost:8000/api/categories", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCategory,
      }),
    });
    setModalOpen(false);
    await getCategories();
  };

  const deleteCategoryHandler = async (id: string) => {
    await fetch("http://localhost:8000/api/categories/delete", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({ id }),
    });
    await getCategories();
  };

  return (
    <>
      <div className=" h-fit w-full bg-white rounded-xl">
        <div className="p-6 inter">
          <h2 className="font-semibold">Dishes category</h2>
          <div className="flex flex-wrap gap-2 mt-4 font-medium ">
            {categories.map((category) => (
              <div key={category._id} className="flex items-center gap-2">
                <div className="flex items-center gap-2 border border-gray-300 rounded-full pl-4 py-1 pr-1 bg-white text-black">
                  <span>{category.name}</span>
                  <button
                    onClick={() => deleteCategoryHandler(category._id)}
                    className="bg-black text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-700"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}

            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogTrigger asChild>
                <img src="icon.svg" onClick={() => setModalOpen(true)}></img>
                {/* <Image
                  src="icon.svg"
                  alt="icon.svg"
                  width="40"
                  height="40"
                  onClick={() => setModalOpen(true)}
                ></Image> */}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add new category</DialogTitle>
                  <DialogDescription asChild>
                    <div className="w-[412px] mt-[24px]">
                      <span className="text-sm font-medium mb-[8px] text-black">
                        Category name
                      </span>
                      <Input
                        className="mt-2 text-black"
                        onChange={newCategoryNameChangeHandler}
                        placeholder="List ingredients..."
                      />
                      <Button
                        onClick={createCategoryHandler}
                        className="w-[93px] h-[40px] bg-black text-white mt-[24px] ml-[319px]"
                        variant="outline"
                      >
                        Add Dish
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {categories.map((category) => (
        <div
          key={category._id}
          className="bg-white w-full h-fit rounded-xl mt-6"
        >
          <div className="p-5">
            <div className="w-[100px] h-[28px] mt-[5px] ml-[20px] mb-4 inter text-xl font-semibold">
              {category.name}
            </div>
            <div className="flex gap-4 flex-wrap">
              <CreateFoodDialog
                categorid={category._id}
                title={category.name}
              />
              <AddCreateFood
                key={category._id}
                refetchFoods={getFoods}
                foods={foods.filter(
                  (food) => food.categoryId._id === category._id
                )}
                categories={categories}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
