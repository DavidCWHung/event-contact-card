import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { firstName, lastName, title, company, email, linkedin } = req.body;

      const { data, error } = await supabase
        .from("guests")
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            title,
            company,
            email,
            linkedin,
          },
        ])
        .select();

      if (error) throw error;

      res.status(200).json({ success: true, guest: data[0] });
    } catch (err: unknown) {
      console.error(
        "Supabase insert error:",
        err instanceof Error ? err.message : "Unknown error"
      );
      res
        .status(500)
        .json({
          success: false,
          error: err instanceof Error ? err.message : "Unknown error",
        });
    }
  } else if (req.method === "GET") {
    try {
      const { id } = req.query;

      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      res.status(200).json({ success: true, guest: data });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      res.status(500).json({ success: false, error: message });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
