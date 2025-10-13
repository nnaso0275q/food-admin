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

  const getCategories = async () => {
    const result = await fetch("http://localhost:8000/api/categories");
    const responseData = await result.json();
    console.log({ responseData });
    const { data } = responseData;
    console.log(data);
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
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
    await getCategories();
  };

  const deleteCategoryHandler = async (category: string) => {
    await fetch("http://localhost:8000/api/categories/delete", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(category),
    });
  };

  return (
    <div className=" h-fit w-full bg-white rounded-xl">
      <div className="p-6 inter">
        <h2 className="font-semibold">Dishes category</h2>
        <div className="flex flex-wrap gap-2 mt-4 font-medium">
          {categories.map((category) => (
            <div key={category._id}>
              <Button className="relative h-fit rounded-full w-fit border border-gray-300 text-black bg-white hover:bg-gray-300 ">
                {category.name}
              </Button>
              <button
                className="absolute bg-black text-white hover:bg-gray-600 w-7 h-7 items-center mx-auto  rounded-full justify-self-end "
                onClick={() => deleteCategoryHandler(category._id)}
              >
                -
              </button>
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
                    <span className="text-sm font-medium mb-[8px]">
                      Category name
                    </span>
                    <Input
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
