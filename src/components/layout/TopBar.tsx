import Link from "next/link";

export default function TopBar() {
  return (
    <div 
      suppressHydrationWarning
      className="w-full h-[35px] bg-[#0F467F] flex items-center justify-end px-4 md:px-6 xl:px-[63px] shrink-0"
    >
      <nav className="flex items-center gap-[16px] md:gap-[31px]">
        <Link
          href="/help"
          className="text-[11px] md:text-[12px] font-semibold leading-none tracking-normal text-white"
        >
          Help
        </Link>
        <Link
          href="/contact"
          className="text-[11px] md:text-[12px] font-semibold leading-none tracking-normal text-white"
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}
