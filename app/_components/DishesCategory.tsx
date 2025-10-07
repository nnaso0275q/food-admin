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
export default function DishesCategory() {
  const categorys = [
    "All Dishes",
    "Appatizers",
    "Salads",
    "Pizzas",
    "Lunch favorites",
    "Main dishes",
    "Fish & Sea foods",
    "Branch",
    "Side dish",
    "Desserts",
    "Beverages",
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {categorys.map((cat, i) => (
        <Button
          key={i}
          className="h-9 rounded-full w-fit border border-gray-300 text-black bg-white "
        >
          {cat}
        </Button>
      ))}
      <Dialog>
        <DialogTrigger>
          <img src="icon.svg"></img>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
            <DialogDescription>
              <div className="w-[412px] mt-[24px]">
                <div className="text-sm font-medium mb-[8px]">
                  Categoty name
                </div>
                <Input placeholder="List ingredients..." />
              </div>
              <Button
                className="w-[93px] h-[40px] bg-black text-white mt-[24px] ml-[319px]"
                variant="outline"
              >
                Add Dish
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
