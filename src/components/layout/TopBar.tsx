import Link from "next/link";

export default function TopBar() {
  return (
    <div className="w-full h-[35px] bg-[#0F467F] flex items-center justify-end px-6 xl:px-[63px]">
      <nav className="flex items-center gap-[31px]">
        <Link
          href="/help"
          className="text-[12px] font-semibold leading-none tracking-normal text-white"
        >
          Help
        </Link>
        <Link
          href="/contact"
          className="text-[12px] font-semibold leading-none tracking-normal text-white"
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}
