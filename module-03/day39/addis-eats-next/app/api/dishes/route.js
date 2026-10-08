import { getMenu } from "@/lib/menu";

export async function GET() {
  const dishes = await getMenu();

  return Response.json(dishes);
}