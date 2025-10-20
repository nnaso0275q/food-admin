import { Category, FoodType } from "@/lib/types";
import UpdateFoodById from "./UpdateFoodById";

export default function AddCreateFood({
  categories,
  refetchFoods,
  foods,
}: {
  categories: Category[];
  refetchFoods: () => void;
  foods: FoodType[];
}) {
  return (
    <>
      {foods?.map((food: FoodType) => (
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

              <UpdateFoodById
                food={food}
                categories={categories}
                refetchFoods={refetchFoods}
              />
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
