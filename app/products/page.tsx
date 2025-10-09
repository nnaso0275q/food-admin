import { AdminLayout } from "../_components/pageComponents/AdminLayout";
import CreateFoodDialog from "../_components/productsComponents/CreateFoodDialog";
import DishesCategory from "../_components/productsComponents/DishesCategory";

export default function ProductPage() {
  return (
    <AdminLayout>
      <DishesCategory />
      <div className="mt-6">
        <CreateFoodDialog />
      </div>
    </AdminLayout>
  );
}
