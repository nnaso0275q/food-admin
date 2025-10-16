export const AddFoodHandler = async (
  name: string,
  price: string,
  image: File,
  ingredients: string,
  selectedCategory: string,
  refetchFoods: () => Promise<void>,
  setOpen: (open: boolean) => void,
  setName: (name: string) => void,
  setPrice: (price: string | number) => void,
  setImage: (image: File | undefined) => void,
  setIngredients: (ingredients: string) => void,
  setSelectedCategory: (category: string) => void
) => {
  if (!name || !price || !image || !ingredients || !selectedCategory) {
    alert("All fields are required");
    return;
  }

  const form = new FormData();
  form.append("name", name);
  form.append("price", String(price));
  if (image) {
    form.append("image", image);
  }

  form.append("ingredients", ingredients);
  form.append("categoryId", selectedCategory);

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
      setPrice(0);
      setImage(undefined);
      setIngredients("");
    }
  } catch (error) {
    alert("Failed to create food");
  }
};
