import Image from "next/image";
import Link from "next/link";

const messages = [
  {
    id: 1,
    name: "Kasun Samarathunga",
    preview: "Regarding my ad approval",
    date: "Today",
    dateNum: null,
    avatar: "/images/placeholder-avatar1.jpg",
  },
  {
    id: 2,
    name: "Sunil Wickramasiinghe",
    preview: "Plz check my rejected ad",
    date: "February",
    dateNum: "5",
    avatar: "/images/placeholder-avatar2.jpg",
  },
  {
    id: 3,
    name: "Anjula Kumara",
    preview: "I updated the image as requested",
    date: "February",
    dateNum: "5",
    avatar: "/images/placeholder-avatar3.jpg",
  },
];

export default function Messages() {
  return (
    <div className="bg-[#EAEAEA] rounded-[10px] overflow-hidden h-full flex flex-col">
      {/* Header: 50px, navy */}
      <div className="flex items-center justify-between h-[50px] px-[20px] bg-[#0F467F]">
        <h3
          className="text-white text-[20px] font-normal leading-[100%]"
          style={{ fontFamily: "Eurostile, sans-serif" }}
        >
          Messages
        </h3>
        <Link
          href="/messages"
          className="text-white text-[12px] font-normal leading-[150%] hover:underline flex items-center gap-[4px]"
        >
          View All
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 2L6.5 5L3.5 8" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Sub-header: New Messages + View All */}
      <div className="flex items-center justify-between px-[20px] py-[10px]">
        <span className="text-[12px] font-semibold leading-[150%] text-[#000000]">
          New Messages
        </span>
        <span className="text-[12px] font-semibold leading-[150%] text-[#000000]/70">
          View All
        </span>
      </div>

      {/* Message items */}
      <div className="flex flex-col flex-1">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex items-center gap-[12px] px-[20px] py-[10px] ${
              index < messages.length - 1 ? "border-b border-[#D8D8D8]" : ""
            }`}
          >
            {/* Avatar: 40x40 circular */}
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-[#D0D0D0] shrink-0">
              <Image
                src={msg.avatar}
                alt={msg.name}
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Name + preview */}
            <div className="flex-1 min-w-0">
              <p className="text-[#000000] text-[12px] font-semibold leading-[150%] truncate">
                {msg.name}
              </p>
              <p className="text-[#000000] text-[10px] font-normal leading-[150%] truncate">
                {msg.preview}
              </p>
            </div>

            {/* Date + chevron */}
            <div className="flex items-center gap-[2px] shrink-0">
              <div className="text-right">
                {msg.dateNum && (
                  <p className="text-[#000000]/60 text-[14px] font-semibold leading-[100%] text-center">
                    {msg.dateNum}
                  </p>
                )}
                <p className="text-[#000000]/60 text-[10px] font-semibold leading-[150%]">
                  {msg.date}
                </p>
              </div>
              <svg width="8" height="12" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L1 13" stroke="#000000" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
