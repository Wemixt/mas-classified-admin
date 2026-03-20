interface StatCardProps {
  value: number;
  label: string;
  bgColor: string;
}

export default function StatCard({ value, label, bgColor }: StatCardProps) {
  return (
    <div
      className="w-full h-[90px] md:h-[121px] rounded-[10px] flex flex-col justify-center pl-[16px] md:pl-[24px]"
      style={{ backgroundColor: bgColor }}
    >
      <span
        className="text-white text-[28px] md:text-[40px] font-normal leading-[100%] tracking-normal"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        {value}
      </span>
      <span
        className="text-white text-[12px] md:text-[16px] font-normal leading-[100%] tracking-normal mt-[6px] md:mt-[8px]"
        style={{ fontFamily: "Eurostile, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}
