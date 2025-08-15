import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
const locale = "pt";

export async function toArray(data: any) {
  const categoryIds = [
    ...data.map((c: any) => c.id),
    ...data.flatMap((c: any) => (c.subcategories || []).map((s: any) => s.id)),
  ];

  // Fetch all images in a single query
  const images: any[] = await prisma.$queryRaw`
    SELECT id_object, thumbnail_medium
    FROM multimedias
    WHERE zone = 'categories'
      AND is_base64 = 1
      AND multimedias.default = 1
      AND id_object IN (${Prisma.join(categoryIds)})
  `;

  // Map images by category id
  const imageMap = Object.fromEntries(
    images.map((img: any) => [img.id_object, img.thumbnail_medium])
  );

  // Map categories
  return data.map((category: any) => ({
    active: category.active,
    name: category.name?.[locale] ?? "",
    order: category.order,
    relateds: (category.subcategories || []).map((sub: any) => ({
      active: sub.active,
      name: sub.name?.[locale] ?? "",
      order: sub.order,
      relateds: [],
      show_image_navbar: sub.show_image_navbar ?? false,
      show_on_navbar: sub.show_on_navbar ?? false,
      slug: sub.slug?.[locale] ?? "",
      image: imageMap[sub.id] ?? null,
    })),
    show_image_navbar: category.show_image_navbar ?? false,
    show_on_navbar: category.show_on_navbar ?? false,
    slug: category.slug?.[locale] ?? "",
    image: imageMap[category.id] ?? null,
  }));
}
