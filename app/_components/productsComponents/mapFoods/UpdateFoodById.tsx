import { useState } from "react";
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
import { Category, FoodType } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";

export default function UpdateFoodById({
  food,
  categories,
  refetchFoods,
}: {
  food: FoodType;
  categories: Category[];
  refetchFoods: () => void;
}) {
  const [update, setUpdate] = useState<FoodType | null>(null);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(food.name);
  const [price, setPrice] = useState<number | string>(food.price);
  const [ingredients, setIngredients] = useState(food.ingredients);
  const [image, setImage] = useState<File | undefined | string>(food.image);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    food.categoryId._id
  );
  console.log("barijavah ", food);
  // Update handler
  const updateFoodHandler = async () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", String(price));
    form.append("ingredients", ingredients);
    food._id ? form.append("foodId", food._id) : "";

    if (selectedCategory) {
      form.append("categoryId", selectedCategory);
    } else {
      alert("Please select a category!");
      return;
    }

    if (image) {
      form.append("image", image);
    }
    console.log({ name, ingredients, price, selectedCategory, image });
    try {
      const res = await fetch("http://localhost:8000/api/food", {
        method: "PUT",
        body: form,
      });

      const data = await res.json();
      console.log(data, "data");

      if (res.ok) {
        await refetchFoods();
        setOpen(false);
        setUpdate(null);
        setImage(undefined);
        console.log("Food updated successfully", data);
      } else {
        console.log("Update failed", data);
        alert(data?.error ?? "Update failed");
      }
    } catch (err) {
      console.log("Error updating food", err);
      alert("Error updating food");
    }
  };

  const deleteFoodHandler = async (id: string) => {
    await fetch("http://localhost:8000/api/categories/cardDelete", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    await updateFoodHandler();
  };

  return (
    <>
      <Dialog
        open={open && update?._id === food._id}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setOpen(false);
            setUpdate(null);
          }
        }}
      >
        <DialogTrigger asChild>
          <img
            src="edit.svg"
            className="absolute top-2 right-2 h-11 w-11 m-3 cursor-pointer"
            alt="edit"
            onClick={() => {
              setUpdate(food);
              setOpen(true);
            }}
          />
        </DialogTrigger>

        <DialogContent className="inter w-[480px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-lg">
              Edit Dish Info
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="space-y-5">
            {/* Name */}
            <div className="flex gap-3">
              <span className="w-[120px] text-xs text-muted-foreground">
                Dish name
              </span>
              <Input
                placeholder="Type food name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="flex gap-3">
              <span className="w-[120px] text-xs text-muted-foreground">
                Dish category
              </span>
              <Select
                value={selectedCategory ?? ""}
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ingredients */}
            <div className="flex gap-3">
              <span className="w-[120px] text-xs text-muted-foreground">
                Ingredients
              </span>
              <Textarea
                placeholder="List ingredients..."
                className="h-[80px]"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>

            {/* Price */}
            <div className="flex gap-3">
              <span className="w-[120px] text-xs text-muted-foreground">
                Price
              </span>
              <Input
                type="number"
                placeholder="Enter price..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Image */}
            <div className="flex gap-3 mt-3">
              <span className="w-[120px] text-xs text-muted-foreground">
                Image
              </span>
              <Input
                className="bg-blue-50"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || undefined)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-[36px]">
            <Button
              className="w-[48px] h-[40px] border border-red-500 bg-white hover:bg-red-100"
              onClick={() => deleteFoodHandler(food._id)}
            >
              <img src="/trash.svg" />
            </Button>

            <Button
              onClick={updateFoodHandler}
              className="w-[120px] h-[40px] bg-black text-white"
            >
              Save changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
