import { AdminLayout } from "./_components/pageComponents/AdminLayout";
import DishesCategory from "./_components/productsComponents/DishesCategory";
export default function Home() {
  return (
    <AdminLayout>
      <DishesCategory />
    </AdminLayout>
  );
}
