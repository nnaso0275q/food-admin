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
import { ChangeEvent, useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  __v?: number;
}

export default function DishesCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const getDeleteCategories = async () => {
    const result = await fetch("http://localhost:8000/api/categories");
    const responseData = await result.json();
    console.log({ responseData });
    const { data } = responseData;
    console.log(data);
    setCategories(data);
  };


  useEffect(() => {
    getDeleteCategories();
  }, []);

  const newCategoryNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };
  const createCategoryHandler = async () => {
    await fetch("http://localhost:8000/api/categories", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCategory,
      }),
    });
    setModalOpen(false);
    await getDeleteCategories();
  };

  const deleteCategoryHandler = async (id: string) => {
    const res = await fetch("http://localhost:8000/api/categories/delete", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({ id }),
    });
    await getDeleteCategories();
  };

  return (
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

          <Dialog open={modalOpen}>
            <DialogTrigger asChild>
              <img src="icon.svg" onClick={() => setModalOpen(true)}></img>
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
  );
}
