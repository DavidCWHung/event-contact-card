import { GetServerSideProps } from "next";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type Guest = {
  id: number;
  first_name: string;
  last_name: string;
  title?: string;
  company?: string;
  mobile?: string;
  email?: string;
  whatsapp?: string;
  wechat?: string;
  linkedin?: string;
  created_at: string;
};

export default function ThankYou({ guest }: { guest: Guest | null }) {
  if (!guest) return <p>Guest not found.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        {" "}
        <h1 className="text-lg text-black text-center mb-4">
          Thank you!
          <br />
          Your number is <b>{guest.id}</b>.<br />
          Please provide this number to the staff.
        </h1>
        {/* Back to Home link */}
        <div className="mt-6 text-center">
          <Link href="/">
            <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
              ⬅ Back to Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const guestId = query.guestId;
  if (!guestId) return { props: { guest: null } };

  const { data: guest } = await supabase
    .from("guests")
    .select("*")
    .eq("id", guestId)
    .single();

  return { props: { guest } };
};
