import Image from "next/image";
import Link from "next/link";

const activities = [
  {
    id: 1,
    user: "Kasun Sampath (Moderator)",
    action: "approved a new ad:",
    detail: '"Dell Inspirre 17 11th Gen Laptop" by Ishan Nayanajith',
    date: "Today",
    time: "Today at 10:34 AM",
    avatar: "/images/placeholder-avatar1.jpg",
  },
  {
    id: 2,
    user: "Suraj Prasanna (Moderator)",
    action: "rejected an ad:",
    detail: '"Cotton M T-Shirt - Hi Quality" by Kasun Suraj',
    reason: "Incomplete product details",
    date: "Today",
    time: "Today at 6:15 PM",
    avatar: "/images/placeholder-avatar2.jpg",
  },
  {
    id: 3,
    user: "Kasun Perera (Admin)",
    action: "edited and published an ad:",
    detail: '"JBL T50 Bluetooth Wireless Headset" by Supun Thathsara',
    changes: "Updated description and images",
    date: "Today",
    time: "Yesterday at 3:40 PM",
    avatar: "/images/placeholder-avatar3.jpg",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-[10px] overflow-hidden">
      <div className="flex items-center justify-between h-[44px] px-[16px] bg-[#0F467F]">
        <h3
          className="text-white text-[14px] font-semibold"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Recent User Activity
        </h3>
        <Link
          href="/activity"
          className="text-white text-[11px] font-normal hover:underline flex items-center gap-[4px]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          View All
          <svg width="5" height="9" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      <div className="flex flex-col">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex gap-[12px] p-[14px] ${
              index < activities.length - 1 ? "border-b border-[#F0F0F0]" : ""
            }`}
          >
            <div className="w-[36px] h-[36px] rounded-full overflow-hidden bg-[#E0E0E0] shrink-0">
              <Image
                src={activity.avatar}
                alt={activity.user}
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] leading-[1.4]" style={{ fontFamily: "Eurostile, sans-serif" }}>
                <span className="font-bold text-[#333333]">{activity.user}</span>{" "}
                <span className="text-[#333333]">{activity.action}</span>
              </p>
              <p
                className="text-[#555555] text-[11px] mt-[2px]"
                style={{ fontFamily: "Eurostile, sans-serif" }}
              >
                {activity.detail}
              </p>
              {activity.reason && (
                <p className="text-[11px] mt-[2px]" style={{ fontFamily: "Eurostile, sans-serif" }}>
                  <span className="text-[#D32F2F] font-medium">Reason:</span>{" "}
                  <span className="text-[#555555]">{activity.reason}</span>
                </p>
              )}
              {activity.changes && (
                <p className="text-[11px] mt-[2px]" style={{ fontFamily: "Eurostile, sans-serif" }}>
                  <span className="text-[#1174BB] font-medium">Changes:</span>{" "}
                  <span className="text-[#555555]">{activity.changes}</span>
                </p>
              )}
              <div className="flex items-center gap-[8px] mt-[4px]">
                <span className="text-[#1174BB] text-[10px] font-medium" style={{ fontFamily: "Eurostile, sans-serif" }}>
                  {activity.date} &gt;
                </span>
                <span className="text-[#999999] text-[10px] flex items-center gap-[3px]">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="5.5" stroke="#999999" strokeWidth="1"/>
                    <path d="M6 3V6.5L8.5 8" stroke="#999999" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
