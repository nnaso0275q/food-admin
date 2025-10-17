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

export default function AddCreateFood({
  refetchFoods,
}: {
  category: Category;
  foods: FoodType[];
  refetchFoods: () => Promise<void>;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allFoods, setAllFoods] = useState<FoodType[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState<File | undefined>();
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // console.log({ selectedCategory });
  // console.log(
  //   "TrueFalse",
  //   !name,
  //   !price,
  //   !image,
  //   !ingredients,
  //   !selectedCategory
  // );

  const getFoods = async () => {
    const result = await fetch("http://localhost:8000/api/food");
    const data = await result.json();
    setAllFoods(data.data);
  };

  useEffect(() => {
    getFoods();
  }, []);

  const createFoodHandler = async () => {
    if (!name || !price || !ingredients || !image || !selectedCategory) {
      alert("Please fill all fields");
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("price", String(price));
    form.append("ingredients", ingredients);
    form.append("categoryId", selectedCategory);
    form.append("image", image);

    try {
      const res = await fetch("http://localhost:8000/api/food", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        await refetchFoods();
        setOpen(false);
        setName("");
        setPrice("");
        setIngredients("");
        setImage(undefined);
        setSelectedCategory("");
      } else {
        alert(data.error || "Failed to create food");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      {allFoods?.map((food: FoodType) => (
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

              {/* Dialog with controlled open */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <img
                    src="edit.svg"
                    className="absolute top-2 right-2 h-11 w-11 m-3 cursor-pointer"
                    alt="edit"
                    onClick={() => setOpen(true)}
                  />
                </DialogTrigger>

                <DialogContent className="inter w-[480px]">
                  <DialogHeader>
                    <DialogTitle className="font-bold text-lg">
                      Dishes
                    </DialogTitle>
                    <DialogDescription />
                  </DialogHeader>

                  <div className="space-y-4 mt-6">
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
                      {categories.length > 0 && (
                        <Select
                          onValueChange={(value) => setSelectedCategory(value)}
                        >
                          <SelectTrigger className="w-fit">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => {
                              return (
                                <SelectItem
                                  key={category._id}
                                  value={selectedCategory}
                                >
                                  {category.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      )}
                      {/* <Input
                        placeholder="Enter category ID"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      /> */}
                    </div>

                    {/* Ingredients */}
                    <div className="flex gap-3">
                      <span className="w-[120px] text-xs text-muted-foreground">
                        Ingredients
                      </span>
                      <Input
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
                    <div className="flex gap-3">
                      <span className="w-[120px] text-xs text-muted-foreground">
                        Image
                      </span>
                      <Input
                        className="bg-blue-50"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setImage(e.target.files?.[0] || undefined)
                        }
                      />
                    </div>

                    {/* Button */}
                    <div className="flex justify-end">
                      <Button
                        onClick={createFoodHandler}
                        className="w-[120px] h-[40px] bg-black text-white"
                      >
                        Save changes
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Detail */}
            <div className="flex items-center justify-between mt-5">
              <div className="text-red-500">{food.name}</div>
              <div>{food.price}</div>
            </div>
            <div className="text-sm text-muted-foreground">
              {food.ingredients}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
