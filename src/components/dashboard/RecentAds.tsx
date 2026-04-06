import Image from "next/image";
import Link from "next/link";

const recentAds = [
  {
    id: 1,
    title: "Rent a car - Raize 2025 ...",
    condition: "New",
    price: "Rs.1195000.00",
    date: "Today",
    image: "/images/placeholder-car.jpg",
  },
  {
    id: 2,
    title: "Samsung 50inch Smart Tv...",
    condition: "New",
    price: "Rs.98000.00",
    date: "Today",
    image: "/images/placeholder-tv.jpg",
  },
  {
    id: 3,
    title: "JBL T50 Bluetooth Wireles...",
    condition: "New",
    price: "Rs.30000.00",
    date: "Yesterday",
    image: "/images/placeholder-headphone.jpg",
  },
];

export default function RecentAds() {
  return (
    <div className="bg-white rounded-[10px] overflow-hidden border-[0.5px] border-[#6C6C6C] h-full flex flex-col mt-4">
      {/* Header */}
      <div className="flex items-center justify-between h-[44px] md:h-[50px] px-[16px] md:px-[20px] bg-[#0F467F] mb-4 md:mb-6 shrink-0">
        <h3
          className="text-white text-[16px] md:text-[20px] font-normal leading-[100%]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Recent Ads
        </h3>
        <Link
          href="/published-ads"
          className="text-white text-[11px] md:text-[12px] font-normal leading-[150%] hover:underline transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Ad items */}
      <div className="flex flex-col flex-1">
        {recentAds.map((ad, index) => (
          <div
            key={ad.id}
            className={`px-[14px] md:px-[20px] py-[10px] md:py-[14px] ${
              index < recentAds.length - 1 ? "border-b border-[#E8E8E8] mb-2 md:mb-3" : ""
            }`}
          >
            <div className="flex gap-[10px] md:gap-[14px]">
              {/* Product image: responsive size */}
              <div className="w-[60px] md:w-[77px] h-[64px] md:h-[81px] rounded-[4px] overflow-hidden bg-[#F0F0F0] shrink-0">
                <Image
                  src={ad.image}
                  alt={ad.title}
                  width={77}
                  height={81}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Product info */}
              <div className="flex-1 min-w-0">
                {/* Title row with date */}
                <div className="flex items-start justify-between gap-[6px]">
                  <p className="text-[#000000] text-[13px] md:text-[16px] font-semibold leading-[150%] truncate">
                    {ad.title}
                  </p>
                  <span className="text-[#5E5E5E] text-[9px] md:text-[10px] font-semibold leading-[150%] shrink-0 pt-[3px]">
                    {ad.date}
                  </span>
                </div>
                {/* Condition */}
                <span className="text-[#5E5E5E] text-[9px] md:text-[10px] font-normal leading-[150%]">
                  {ad.condition}
                </span>
                {/* Price + button row */}
                <div className="flex items-center justify-between mt-[2px]">
                  <p className="text-[#ED1C24] text-[13px] md:text-[18px] font-medium leading-[150%]">
                    {ad.price}
                  </p>
                  <Link
                    href={`/ads/${ad.id}`}
                    className="flex items-center justify-center w-[80px] md:w-[110px] h-[26px] md:h-[30px] bg-[#D2D2D2] rounded-[8px] text-[#101010] text-[10px] md:text-[12px] font-normal leading-[150%] hover:bg-[#C0C0C0] transition-colors shrink-0"
                  >
                    View Ad details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
