import Image from "next/image";
import Link from "next/link";

const activities = [
  {
    id: 1,
    user: "Kasun Sampath (Moderator)",
    action: "approved a new ad:",
    detail: '"Dell Inspire 17 11th Gen Laptop" by Ishan Nayanajith',
    date: "Today",
    time: "Today at 10:24 AM",
    avatar: "/images/placeholder-avatar1.jpg",
  },
  {
    id: 2,
    user: "Suraj Prasanna (Moderator)",
    action: "rejected an ad:",
    detail: '"Cotton M T-Shirt – Hi Quality" by Kasun Suraj',
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

function ClockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" />
      <path d="M6 3V6.5L8.5 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default function RecentActivity() {
  return (
    <div className="bg-[#EAEAEA] rounded-[10px] overflow-hidden h-full flex flex-col mt-4">
      {/* Header */}
      <div className="flex items-center justify-between h-[44px] md:h-[50px] px-[16px] md:px-[20px] bg-[#0F467F] shrink-0">
        <h3
          className="text-white text-[14px] md:text-[20px] font-normal leading-[100%]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Recent User Activity
        </h3>
        <Link
          href="/activity"
          className="text-white text-[11px] md:text-[12px] font-normal leading-[150%] hover:underline flex items-center gap-[4px]"
        >
          View All
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 2L6.5 5L3.5 8" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Activity items */}
      <div className="flex flex-col flex-1">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex gap-[10px] md:gap-[12px] px-[14px] md:px-[20px] py-[10px] md:py-[12px] ${
              index < activities.length - 1 ? "border-b border-[#D8D8D8]" : ""
            }`}
          >
            {/* Avatar: scales from 32→40px */}
            <div className="w-[32px] md:w-[40px] h-[32px] md:h-[40px] rounded-full overflow-hidden bg-[#D0D0D0] shrink-0">
              <Image
                src={activity.avatar}
                alt={activity.user}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* User + action */}
              <p className="text-[11px] md:text-[12px] leading-[150%]">
                <span className="font-semibold text-[#000000]">{activity.user}</span>{" "}
                <span className="font-semibold text-[#000000]">{activity.action}</span>
              </p>

              {/* Detail */}
              <p className="text-[#000000] text-[9px] md:text-[10px] font-normal leading-[150%] mt-[1px]">
                {activity.detail}
              </p>

              {/* Reason */}
              {activity.reason && (
                <p className="text-[9px] leading-[150%] mt-[1px]">
                  <span className="font-semibold text-[#000000]">Reason:</span>{" "}
                  <span className="font-normal text-[#000000]">{activity.reason}</span>
                </p>
              )}

              {/* Changes */}
              {activity.changes && (
                <p className="text-[9px] leading-[150%] mt-[1px]">
                  <span className="font-semibold text-[#000000]">Changes:</span>{" "}
                  <span className="font-normal text-[#000000]">{activity.changes}</span>
                </p>
              )}

              {/* Footer timestamp */}
              <div className="flex items-center justify-end gap-[4px] md:gap-[6px] mt-[3px] flex-wrap">
                <span className="text-[9px] md:text-[10px] font-semibold leading-[150%] text-[#000000]/60">
                  {activity.date}
                </span>
                <span className="text-[9px] md:text-[10px] text-[#000000]/60">&gt;</span>
                <span className="text-[8px] font-normal leading-[150%] text-[#000000]/80 flex items-center gap-[3px]">
                  <ClockIcon />
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
