export const AddFoodHandler = async (
  name: string,
  price: string,
  image: File,
  ingredients: string,
  selectedCategory: string
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
    const response = await fetch("http://localhost:8000/api/food", {
      method: "POST",
      body: form,
    });
    // getFoods();

    const data = await response.json();
    return data;
  } catch (error) {
    alert("Failed to create food");
  }
};
