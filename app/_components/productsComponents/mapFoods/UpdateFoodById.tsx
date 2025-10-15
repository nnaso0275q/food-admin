import React from "react";

export default function UpdateFoodById() {
  return <div className="text-3xl">Update hiine</div>;
}
// const pathUpdateFood = async (id: string) => {
//   try {
//     const res = await fetch(`http://localhost:8000/api/food/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({
//         name: "shine hoolnii ner",
//         price: "25000",
//       }),
//     });
//     if (!res.ok) throw new Error("Update failed");
//     //   const data = await res.json()
//     // console.log("Updated", data)

//     getFoods();
//   } catch (error) {
//     console.error(error);
//   }
// };