import { AdminLayout } from "../_components/pageComponents/AdminLayout";
import AddCreateFood from "../_components/productsComponents/AddCreateFood";
import CreateFoodDialog from "../_components/productsComponents/CreateFoodDialog";
import DishesCategory from "../_components/productsComponents/DishesCategory";

export default function ProductPage() {
  return (
    <AdminLayout>
      <DishesCategory />
      <div className="bg-white w-full h-fit rounded-xl mt-6">
        <div className="p-5">
          <div className="flex gap-4">
            <CreateFoodDialog />
            <AddCreateFood />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
