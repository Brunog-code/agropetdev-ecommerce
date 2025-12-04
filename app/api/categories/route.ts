import { prisma } from "@/lib/db";

export async function GET() {
  const categories = await prisma.category.findMany();
  return new Response(JSON.stringify(categories), { status: 200 });
}
