// pages/api/items/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // Adjust path as needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`[API] ${req.method} /api/items - ${new Date().toLocaleTimeString()}`);
  
  try {
    if (req.method === "GET") {
      const items = await prisma.potteryItem.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      console.log(`[API] Returning ${items.length} items`);
      return res.status(200).json(items);
    } else if (req.method === "POST") {
      console.log("[API] POST body:", req.body);
      const { name, price, image, description, category, status } = req.body;

      if (!name || !image) {
        console.log("[API] Validation failed");
        return res.status(400).json({
          error: "Name and image are required fields"
        });
      }

      // Validate status field
      if (status && !["in_stock", "preorder", "out_of_stock"].includes(status)) {
        return res.status(400).json({
          error: "Invalid status value. Must be: in_stock, preorder, or out_of_stock",
        });
      }

      const newItem = await prisma.potteryItem.create({
        data: {
          name,
          price: Number(price) || 0,
          image,
          description: description || "",
          category: category || "",
          status: status || "in_stock", // Default to in_stock
        },
      });

      console.log(`[API] Item added:`, newItem);
      return res.status(201).json(newItem);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({
        error: `Method ${req.method} not allowed`
      });
    }
  } catch (error) {
    console.error("[API] Detailed Error:", error);
    console.error("[API] Error stack:", error instanceof Error ? error.stack : "No stack");
    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
      details: error instanceof Error ? error.stack : String(error),
    });
  }
}