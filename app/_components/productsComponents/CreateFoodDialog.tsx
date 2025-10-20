"use client";
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
import { ChangeEvent, useState } from "react";

export default function CreateFoodDialog({
  categorid,
  title,
}: {
  title: string;
  categorid: string;
}) {
  const [image, setImage] = useState<File | undefined>();
  const [ingredients, setIngredients] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

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

  const AddFoodHandler = async () => {
    if (!name || !price || !image || !ingredients) {
      alert("All fields are required");
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    if (image) {
      form.append("image", image);
    }

    form.append("ingredients", ingredients);
    form.append("categorId", categorid);

    try {
      const res = await fetch("http://localhost:8000/api/food", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        setOpen(false);
        setName("");
        setPrice("");
        setImage(undefined);
        setIngredients("");
      }
    } catch (error) {
      alert("Failed to create food");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="border-1 border-red-400 border-dashed w-[270px] h-[241px] rounded-[20px]">
          <>
            <img
              className="w-[40px] h-[40px] mx-auto"
              src="/icon.svg"
              onClick={() => setOpen(true)}
            />
            <h2 className="mt-[24px] inter text-sm font-medium text-secondary-foreground">
              Add new Dish to {title}
            </h2>
          </>
        </DialogTrigger>

        <DialogContent className="inter w-115 ">
          <div className="font-bold text-lg">Add new Dish to {title}</div>

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
            <DialogTitle>
              <Button
                onClick={AddFoodHandler}
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
    </>
  );
}
