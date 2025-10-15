"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { AddFoodHandler } from "../_utils/AddFoodHandler";

export default function CreateFoodDialog() {
  const [image, setImage] = useState<File | undefined>();
  const [ingredients, setIngredients] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  console.log({ selectedCategory });
  console.log(
    "TrueFalse",
    !name,
    !price,
    !image,
    !ingredients,
    !selectedCategory
  );
  interface Category {
    _id: string;
    name: string;
    __v?: number;
  }

  const getCategories = async () => {
    const response = await fetch("http://localhost:8000/api/categories");
    const data = await response.json();
    setCategories(data.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const creareFoodHandler = async () => {
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }
    if (image) {
      await AddFoodHandler(name, price, image, ingredients, selectedCategory);
    }
  };

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const ingredientsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger className="border-1 border-red-400 border-dashed w-[270px] h-[241px] rounded-[20px]">
        <>
          <img className="w-[40px] h-[40px] mx-auto" src="/icon.svg"></img>
          <h2 className="mt-[24px] inter text-sm font-medium text-secondary-foreground">
            Add new Dish to <br />
            Appetizers
          </h2>
        </>
      </DialogTrigger>

      <DialogContent className="inter w-115 ">
        <div className="font-bold text-lg"> Add new Dish to Appetizers</div>

        <DialogHeader>
          <div className="flex gap-[24px]">
            <div className="w-[194px] h-[60px]">
              <div className="text-sm font-medium mb-[8px]">Food name</div>

              <Input
                placeholder="Type food name"
                value={name}
                onChange={nameChangeHandler}
              />
            </div>

            <div className="w-[194px] h-[60px] ">
              <div className="text-sm font-medium mb-[8px]">Food price</div>

              <Input
                placeholder="Enter price..."
                // defaultValue={0}
                value={price}
                onChange={priceChangeHandler}
                type="number"
              />
            </div>
          </div>

          {/*  */}
          <div className="w-[412px] mt-[24px]">
            <div className="text-sm font-medium mb-[8px]">Ingredients</div>
            <Input
              placeholder="List ingredients..."
              className="h-[90px]"
              type="text"
              value={ingredients}
              onChange={ingredientsChangeHandler}
            />
          </div>

          {/*  */}
          <div className="w-[412px] mt-[24px]">
            <div className="text-sm font-medium mb-[8px]">Food image</div>
            <Input
              className="h-[138px] bg-blue-50 border-1 border-dashed border-blue-200 rounded-md text-sm font-medium mx-auto "
              id="picture"
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
              placeholder="Choose a file or drag & drop it here"
            ></Input>
          </div>
          {categories.length > 0 && (
            <Select onValueChange={(value) => setSelectedCategory(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => {
                  return (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
          <DialogTitle>
            <Button
              onClick={creareFoodHandler}
              className="w-[93px] h-[40px] bg-black text-white mt-[24px] ml-[319px]"
              variant="outline"
            >
              Add Dish
            </Button>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
