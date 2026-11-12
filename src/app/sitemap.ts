import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000";
  const now = new Date();

  const routes = [
    "",
    "/services",
    "/passport-visa-photos",
    "/book",
    "/gallery",
    "/print-order",
    "/about",
    "/contact",
    "/faq",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : route === "/book" || route === "/passport-visa-photos" ? 0.9 : 0.8,
  }));
}

