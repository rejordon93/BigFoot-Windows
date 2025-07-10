import React, { useEffect, useState } from "react";
import { Calendar, Clock, CheckCircle, Star, Activity } from "lucide-react";
import axios from "axios";
import RecentActivity from "../RecentActivity/page";
import { QuoteType } from "../../../../type";

type createdAtType = {
  createdAt: string;
};

export default function ProfileServices() {
  const [memberSince, setMemberSince] = useState<createdAtType>();
  const [quote, setQuote] = useState<QuoteType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get("/api/user");
        setMemberSince({ createdAt: res.data.user.createdAt });
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getQuoteData = async () => {
      try {
        const res = await axios.get("/api/quote/get");
        setQuote(res.data);
        console.log(res.data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    getQuoteData();
  }, []);

  const cards = [
    {
      icon: Calendar,
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/20",
      hoverBorder: "hover:border-blue-500/40",
      title: "Total Services",
      subtitle: "Since joining",
      value: "0", // Replace with actual data
      gradient: "from-blue-500/10 to-blue-600/10",
    },
    {
      icon: CheckCircle,
      iconColor: "text-green-400",
      bgColor: "bg-green-500/20",
      hoverBorder: "hover:border-green-500/40",
      title: "Rating",
      subtitle: "Average rating",
      value: "0", // Replace with actual data
      gradient: "from-green-500/10 to-green-600/10",
      showStars: true,
    },
    {
      icon: Clock,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/20",
      hoverBorder: "hover:border-purple-500/40",
      title: "Upcoming",
      subtitle: "Services scheduled",
      value: quote.length || "0",
      gradient: "from-purple-500/10 to-purple-600/10",
    },
    {
      icon: Activity,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-500/20",
      hoverBorder: "hover:border-amber-500/40",
      title: "Status",
      subtitle: `Member since ${
        memberSince
          ? new Date(memberSince.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Loading..."
      }`,
      value: "Active",
      gradient: "from-amber-500/10 to-amber-600/10",
    },
  ];

  return (
    <div>
      {/* Services Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">Service Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`group bg-gradient-to-br ${
                card.gradient
              } backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50 ${
                card.hoverBorder
              } transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: isLoaded
                  ? "fadeInUp 0.6s ease-out forwards"
                  : "none",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 ${card.bgColor} rounded-xl transition-all duration-300 group-hover:scale-110`}
                >
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <span className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                  {card.value}
                </span>
              </div>
              <h3 className="text-slate-300 font-medium text-lg mb-1">
                {card.title}
              </h3>
              <p className="text-slate-400 text-sm">{card.subtitle}</p>

              {card.showStars && (
                <div className="flex items-center space-x-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 transition-all duration-300 ${
                        i < Math.floor(0)
                          ? "text-yellow-400 fill-current"
                          : "text-slate-600 group-hover:text-slate-500"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <RecentActivity />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
