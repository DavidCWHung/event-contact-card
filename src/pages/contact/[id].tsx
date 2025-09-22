import { GetServerSideProps } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Guest = {
  id: number;
  first_name: string;
  last_name: string;
  title?: string;
  company?: string;
  email: string;
  linkedin?: string;
  wechat?: string;
  created_at: string;
};

export default function Contact({ guest }: { guest: Guest | null }) {
  if (!guest) return <p className="p-6">Guest not found.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <div className="border p-4 rounded mt-4">
          <h2 className="text-xl font-bold">
            {guest.first_name} {guest.last_name}
          </h2>
          <p>
            {guest.title} @ {guest.company}
          </p>
          <p className="mt-2 text-sm">Email: {guest.email}</p>
          <p className="text-sm">
            LinkedIn:{" "}
            <a href={guest.linkedin} className="text-blue-600">
              {guest.linkedin}
            </a>
          </p>
          <p className="text-sm">Wechat ID: {guest.wechat}</p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!;
  const { data: guest, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  return { props: { guest: guest || null } };
};
