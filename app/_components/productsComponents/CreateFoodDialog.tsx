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
import { addFoodHandler } from "../_utils/AddFoodUtils";

export default function CreateFoodDialog() {
  const [image, setImage] = useState<File | undefined>();
  const [ingredients, setIngredients] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  // const [price, setPrice] = useState<number>(0)

  //     const data = await response.json();
  //   if (response.ok) {
  //     alert("Food created successfully!");
  //     setName("");
  //     setPrice(0);
  //     setImage(undefined);
  //     setIngredients("");
  //     setCategory("");
  //   } else {
  //     alert(data.error || "Failed to create food");
  //   }
  // } catch (error) {
  //   alert("Failed to create food");
  // }

  const creareFoodHandler = async () => {
    if (image) {
      addFoodHandler(name, price, image, ingredients, category);
    }
  };

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // setPrice(Number(e.target.value));
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

  // const categoryChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setCategory(e.target.value);
  // };

  return (
    <div className="bg-white w-full h-fit rounded-xl">
      <div className="p-5">
        <Dialog>
          <DialogTrigger className="border-1 border-red-400 border-dashed w-[270px] h-[241px] rounded-[20px]">
            <div className="">
              <img className="w-[40px] h-[40px] mx-auto" src="/icon.svg"></img>
              <h2 className="mt-[24px] inter text-sm font-medium text-secondary-foreground">
                Add new Dish to <br />
                Salads
              </h2>
            </div>
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
      </div>
    </div>
  );
}
