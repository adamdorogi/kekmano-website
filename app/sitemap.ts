import type { MetadataRoute } from "next";
import { services, siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/csepregi-gyuri",
    ...services.map((s) => `/${s.slug}`),
    "/referencia-videok",
    "/kapcsolat",
    "/adatkezelesi-tajekoztato",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.includes("tajekoztato") ? 0.3 : 0.8,
  }));
}
