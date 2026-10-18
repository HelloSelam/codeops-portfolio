import { db } from "../../../db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const search = (searchParams.get("search") || "").trim().toLowerCase();
  const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const pageSize = 2;

  const allDishes = await db.dish.findMany();

  const filteredDishes = allDishes.filter((dish) =>
  dish.name.toLowerCase().includes(search)
  );

  const totalPages = Math.ceil(filteredDishes.length / pageSize);
  const startIndex = (page - 1) * pageSize;

  const dishes = filteredDishes.slice(startIndex, startIndex + pageSize);

  return Response.json({
    dishes,
    page,
    pageSize,
    totalPages,
    totalDishes: filteredDishes.length,
  });
}
