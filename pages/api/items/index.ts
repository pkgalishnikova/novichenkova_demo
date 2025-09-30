// pages/api/items/index.ts
import type { NextApiRequest, NextApiResponse } from "next";

let items = [
  {
    id: "1",
    name: "Handmade Ceramic Mug",
    price: 45,
    image: "/images/mug.jpg",
    description: "Beautiful hand-thrown ceramic mug with glaze finish",
    category: "mugs",
    inStock: true,
  },
  {
    id: "2",
    name: "Artisan Bowl Set",
    price: 120,
    image: "/images/bowl-set.jpg",
    description: "Set of 3 nesting bowls with natural finish",
    category: "bowls",
    inStock: true,
  },
  {
    id: "3",
    name: "Decorative Vase",
    price: 85,
    image: "/images/vase.jpg",
    description: "Tall decorative vase with intricate patterns",
    category: "vases",
    inStock: false,
  },
  {
    id: "4",
    name: "Clay Dinner Plate",
    price: 35,
    image: "/images/plate.jpg",
    description: "Earthenware dinner plate with rustic finish",
    category: "plates",
    inStock: true,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`[API] ${req.method} /api/items - ${new Date().toLocaleTimeString()}`);

  try {
    if (req.method === "GET") {
      console.log(`[API] Returning ${items.length} items`);
      return res.status(200).json(items);
    } 
    
    else if (req.method === "POST") {
      console.log("[API] POST body:", req.body);
      
      const { name, price, image, description, category, inStock } = req.body;

      if (!name || !image) {
        console.log("[API] Validation failed");
        return res.status(400).json({
          error: "Name and image are required fields"
        });
      }

      const newItem = {
        id: String(Date.now()),
        name,
        price: Number(price) || 0,
        image,
        description: description || "",
        category: category || "",
        inStock: inStock !== undefined ? inStock : true,
      };

      items.push(newItem);
      console.log(`[API] Item added. Total: ${items.length}`);
      return res.status(201).json(newItem);
    } 
    
    else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error("[API] Error:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
}