// pages/api/items/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma"; // adjust the path if needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid ID" });
  }

  if (req.method === "GET") {
    try {
      const item = await prisma.potteryItem.findUnique({
        where: { id: String(id) },
      });

      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

      return res.status(200).json(item);
    } catch (error) {
      console.error("[GET /api/items/:id]", error);
      return res.status(500).json({ error: "Failed to fetch item" });
    }
  }

  if (req.method === "PATCH" || req.method === "PUT") {
    try {
      const {
        name,
        price,
        image,
        description,
        category,
        status,
        weight,
        dimensions,
        care,
        materials,
        additionalInfo,
      } = req.body;

      // Validate status if provided
      if (status && !["in_stock", "preorder", "out_of_stock"].includes(status)) {
        return res.status(400).json({
          error: "Invalid status value. Must be: in_stock, preorder, or out_of_stock",
        });
      }

      const updatedItem = await prisma.potteryItem.update({
        where: { id: String(id) },
        data: {
          ...(name !== undefined && { name }),
          ...(price !== undefined && { price: Number(price) }),
          ...(image !== undefined && { image }),
          ...(description !== undefined && { description }),
          ...(category !== undefined && { category }),
          ...(status !== undefined && { status }),
          ...(weight !== undefined && { weight }),
          ...(dimensions !== undefined && { dimensions }),
          ...(care !== undefined && { care }),
          ...(materials !== undefined && { materials }),
          ...(additionalInfo !== undefined && { additionalInfo }),
        },
      });

      return res.status(200).json(updatedItem);
    } catch (error) {
      console.error("[PATCH /api/items/:id]", error);
      return res.status(500).json({ error: "Failed to update item" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.potteryItem.delete({
        where: { id: String(id) },
      });
      return res.status(200).json({ message: "Item deleted" });
    } catch (error) {
      console.error("[DELETE /api/items/:id]", error);
      return res.status(500).json({ error: "Failed to delete item" });
    }
  }

  res.setHeader("Allow", ["GET", "PATCH", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}