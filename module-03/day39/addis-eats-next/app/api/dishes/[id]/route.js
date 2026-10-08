import { getMenu } from "@/lib/menu";

export async function GET(request, { params }) {
  const { id } = await params;

  const dishes = await getMenu();

  const dish = dishes.find((dish) => dish.slug === id);

  if (!dish) {
    return Response.json(
      { error: "No such dish" },
      { status: 404 }
    );
  }

  return Response.json(dish);
}