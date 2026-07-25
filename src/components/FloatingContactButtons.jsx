import Image from "next/image";
import Link from "next/link";

const PHONE_E164 = "+917428114918";
const PHONE_WA = "917428114918";

export default function FloatingContactButtons() {
  const whatsappHref = `https://wa.me/${PHONE_WA}`;
  const callHref = `tel:${PHONE_E164}`;
  const buttonClass =
    "group inline-flex h-12 w-full flex-1 items-center justify-center gap-2 rounded-xl border border-[#FF40EB]/40 bg-black/70 px-4 text-sm font-semibold text-white/90 backdrop-blur hover:border-[#FF40EB] hover:bg-[#FF40EB]/10 transition shadow-[0_10px_30px_rgba(0,0,0,0.28)] sm:h-12 sm:w-12 sm:flex-none sm:rounded-full sm:px-0 sm:text-transparent sm:shadow-none";
  const iconWrapperClass = "relative h-7 w-7 shrink-0 sm:h-10 sm:w-10";

  return (
    <div className="fixed inset-x-4 bottom-4 z-[9999] sm:inset-x-auto sm:bottom-6 sm:right-6">
      <div className="flex w-full flex-row gap-2 rounded-2xl border border-[#FF40EB]/25 bg-black/80 p-2 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.4)] sm:w-auto sm:flex-col sm:gap-3 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">

       <a 
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title={`WhatsApp: ${PHONE_E164}`}
          className={buttonClass}
        >
          <span className={iconWrapperClass}>
            <Image
              src="/logos/whatsapp.png"
              alt=""
              fill
              className="object-contain group-hover:scale-110 transition"
              aria-hidden="true"
            />
          </span>
          <span className="sm:hidden">WhatsApp</span>
        </a>

        <a
          href={callHref}
          aria-label="Call"
          title={`Call: ${PHONE_E164}`}
          className={buttonClass}
        >
          <span className={iconWrapperClass}>
            <Image
              src="/logos/phonefinal.png"
              alt=""
              fill
              className="object-contain group-hover:scale-110 transition"
              aria-hidden="true"
            />
          </span>
          <span className="sm:hidden">Phone</span>
        </a>

        <Link
          href="?enroll=1"
          aria-label="form"
          className={buttonClass}
        >
          <span
            className={`${iconWrapperClass} flex items-center justify-center rounded-full bg-green-500 group-hover:bg-[#ff5cef] transition`}
          >
            <span className="relative h-4 w-4 sm:h-5 sm:w-5">
              <Image
                src="/logos/form.png"
                alt=""
                fill
                className="object-contain brightness-0 invert transition group-hover:scale-110"
                aria-hidden="true"
              />
            </span>
          </span>
          <span className="sm:hidden">Form</span>
        </Link>
      </div>
    </div>
  );
}