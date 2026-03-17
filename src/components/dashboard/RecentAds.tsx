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
    <div className="bg-white rounded-[10px] p-[20px]">
      <div className="flex items-center justify-between mb-[16px]">
        <h3
          className="text-[#0F467F] text-[16px] font-semibold"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Recent Ads
        </h3>
        <Link
          href="/ads"
          className="text-[#666666] text-[12px] font-normal hover:text-[#0F467F] transition-colors"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          View All
        </Link>
      </div>

      <div className="flex flex-col gap-[12px]">
        {recentAds.map((ad) => (
          <div
            key={ad.id}
            className="flex items-center gap-[12px] pb-[12px] border-b border-[#F0F0F0] last:border-b-0 last:pb-0"
          >
            <div className="w-[80px] h-[64px] rounded-[6px] overflow-hidden bg-[#F0F0F0] shrink-0">
              <Image
                src={ad.image}
                alt={ad.title}
                width={80}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-[#333333] text-[13px] font-semibold truncate"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                {ad.title}
              </p>
              <span className="text-[#999999] text-[10px]">{ad.condition}</span>
              <p
                className="text-[#D32F2F] text-[13px] font-bold mt-[2px]"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                {ad.price}
              </p>
            </div>
            <div className="flex flex-col items-end gap-[6px] shrink-0">
              <span
                className="text-[#999999] text-[11px]"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                {ad.date}
              </span>
              <Link
                href={`/ads/${ad.id}`}
                className="text-[#0F467F] text-[10px] font-medium border border-[#0F467F] rounded-[4px] px-[8px] py-[4px] hover:bg-[#0F467F] hover:text-white transition-colors"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                View Ad details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
