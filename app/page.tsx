import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DishesCategory from "./_components/DishesCategory";
import AdminLayout from "./_components/AdminLayout";
export default function Home() {
  return (
    <AdminLayout>
      <div>
        <DishesCategory></DishesCategory>
      </div>
      <div>
        <Dialog>
          <DialogTrigger className="border-1 border-red-400 border-dashed w-[270px] h-[241px] mt-[50px] ml-[50px] rounded-[20px]">
            <div className="">
              <img className="w-[40px] h-[40px] mx-auto" src="/icon.svg"></img>
              <h2 className="mt-[24px] inter text-sm font-medium text-secondary-foreground">
                Add new Dish to <br />
                Salads
              </h2>
            </div>
          </DialogTrigger>

          <DialogContent className="inter">
            <div className="font-bold text-lg"> Add new Dish to Appetizers</div>

            <DialogHeader className="mx-[6px] my-[6px]">
              <div className="flex gap-[24px]">
                <div className="w-[194px] h-[60px]">
                  <div className="text-sm font-medium mb-[8px]">Food name</div>
                  <Input placeholder="Type food name" />
                </div>

                <div className="w-[194px] h-[60px] ">
                  <div className="text-sm font-medium mb-[8px]">Food price</div>
                  <Input placeholder="Enter price..." />
                </div>
              </div>

              {/*  */}
              <div className="w-[412px] mt-[24px]">
                <div className="text-sm font-medium mb-[8px]">Ingredients</div>
                <Input
                  placeholder="List ingredients..."
                  className="h-[90px]"
                  type="text"
                />
              </div>

              {/*  */}
              <div className="w-[412px] mt-[24px]">
                <div className="text-sm font-medium mb-[8px]">Food image</div>
                <div className="h-[138px] bg-blue-50 border-1 border-dashed border-blue-200 rounded-md text-sm font-medium mx-auto ">
                  {/* Choose a file or drag & drop it here */}
                </div>
              </div>
              <DialogTitle>
                <Button
                  className="w-[93px] h-[40px] bg-black text-white mt-[24px] ml-[319px]"
                  variant="outline"
                >
                  Add Dish
                </Button>
              </DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
