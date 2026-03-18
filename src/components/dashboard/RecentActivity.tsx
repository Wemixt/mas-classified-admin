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
    detail: '"Cotton M T-Shirt \u2013 Hi Quality" by Kasun Suraj',
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
      {/* Header: 50px, navy, top corners rounded */}
      <div className="flex items-center justify-between h-[50px] px-[20px] bg-[#0F467F]">
        <h3
          className="text-white text-[20px] font-normal leading-[100%]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Recent User Activity
        </h3>
        <Link
          href="/activity"
          className="text-white text-[12px] font-normal leading-[150%] hover:underline flex items-center gap-[4px]"
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
            className={`flex gap-[12px] px-[20px] py-[12px] ${
              index < activities.length - 1 ? "border-b border-[#D8D8D8]" : ""
            }`}
          >
            {/* Avatar: 40x40 circular */}
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[#D0D0D0] shrink-0">
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
              {/* User + action: Poppins 600 12px #000000 */}
              <p className="text-[12px] leading-[150%]">
                <span className="font-semibold text-[#000000]">{activity.user}</span>{" "}
                <span className="font-semibold text-[#000000]">{activity.action}</span>
              </p>

              {/* Detail: Poppins 400 10px #000000 */}
              <p className="text-[#000000] text-[10px] font-normal leading-[150%] mt-[1px]">
                {activity.detail}
              </p>

              {/* Reason line: label 600 9px, value 400 9px */}
              {activity.reason && (
                <p className="text-[9px] leading-[150%] mt-[1px]">
                  <span className="font-semibold text-[#000000]">Reason:</span>{" "}
                  <span className="font-normal text-[#000000]">{activity.reason}</span>
                </p>
              )}

              {/* Changes line: label 600 9px, value 400 9px */}
              {activity.changes && (
                <p className="text-[9px] leading-[150%] mt-[1px]">
                  <span className="font-semibold text-[#000000]">Changes:</span>{" "}
                  <span className="font-normal text-[#000000]">{activity.changes}</span>
                </p>
              )}

              {/* Footer: Today > ○ timestamp — right-aligned */}
              <div className="flex items-center justify-end gap-[6px] mt-[3px]">
                <span className="text-[10px] font-semibold leading-[150%] text-[#000000]/60">
                  {activity.date}
                </span>
                <span className="text-[10px] text-[#000000]/60">&gt;</span>
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
