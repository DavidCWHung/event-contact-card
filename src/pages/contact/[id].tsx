import { GetServerSideProps } from "next";
import { supabase } from "@/lib/supabaseClient";

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

export default function Contact({ guest }: { guest: Guest | null }) {
  if (!guest) return <p className="p-6">Guest not found.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {/* Phone Frame */}
      <div className="w-[375px] h-[600px] max-w-full bg-[url('/contact-background.png')] bg-cover bg-center rounded-3xl shadow-2xl overflow-hidden flex flex-col  relative">
        {/* Logo + Tagline */}
        <div className="mt-6 ml-4 text-white">
          <img src="/logo.png" alt="BytePlus Logo" className="h-12 w-auto" />
          <p className="text-sm ml-4 opacity-80">Get In Touch</p>
        </div>

        {/* Contact Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 w-[85%] mx-auto mt-6 text-left">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            {guest.first_name} {guest.last_name}
          </h2>

          <div className="text-sm">
            <p className="mb-4">
              <span className="font-semibold text-[#1F1F1F]">Job Title :</span>{" "}
              <span className="text-gray-500">{guest.title}</span>
            </p>
            <p className="mb-4">
              <span className="font-semibold text-[#1F1F1F]">Company :</span>{" "}
              <span className="text-gray-500">{guest.company}</span>
            </p>
            <p className="mb-4">
              <span className="font-semibold text-[#1F1F1F]">Mobile :</span>{" "}
              <span className="text-gray-500">{guest.mobile}</span>
            </p>
            <p className="mb-4">
              <span className="font-semibold text-[#1F1F1F]">Email :</span>{" "}
              <span className="text-gray-500">{guest.email}</span>
            </p>
            <p className="mb-4">
              <span className="font-semibold text-[#1F1F1F]">Whatsapp :</span>{" "}
              <span className="text-gray-500">{guest.whatsapp}</span>
            </p>
            <p className="mb-4">
              <span className="font-semibold text-[#1F1F1F]">Wechat :</span>{" "}
              <span className="text-gray-500">{guest.wechat}</span>
            </p>
            <p className="mb-4">
              <span className="font-semibold text-[#1F1F1F]">Linkedin :</span>{" "}
              <span className="text-gray-500">{guest.linkedin}</span>
            </p>
          </div>
        </div>

        {/* Save Contact Button */}
        {/* <div className="mb-10 mx-auto">
          <h3 className="text-lg font-semibold text-white mb-3">
            Save My Contact
          </h3>
          <button className="px-6 py-2 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition">
            Click Here
          </button>
        </div> */}
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
