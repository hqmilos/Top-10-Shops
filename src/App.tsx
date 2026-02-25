import React, { useEffect, useState } from 'react';
import { MapPin, AlertTriangle, TrendingUp, Zap, ShoppingCart, Activity } from 'lucide-react';

const initialStores = [
  { id: 1, name: "RISE Dispensaries", location: "Patterson, NJ", eventTitle: "Your Brand Sold Out", eventDetail: "-120 SKUs WoW • $250k/mo", score: 96, seed: "rise", icon: ShoppingCart, iconColor: "text-red-600", bgColor: "bg-red-50" },
  { id: 2, name: "NJ Leaf", location: "Freehold, NJ", eventTitle: "Your Brand Sold Out", eventDetail: "-85 SKUs WoW • $180k/mo", score: 89, seed: "njleaf", icon: ShoppingCart, iconColor: "text-red-600", bgColor: "bg-red-50" },
  { id: 3, name: "Earth & Ivy", location: "New Brunswick, NJ", eventTitle: "Competitor Sold Out", eventDetail: "Your Brand has no presence", score: 82, seed: "earthivy", icon: AlertTriangle, iconColor: "text-orange-600", bgColor: "bg-orange-50" },
  { id: 4, name: "Valley Wellness", location: "Raritan, NJ", eventTitle: "Competitor Sold Out", eventDetail: "Your Brand not moving (0 WoW)", score: 75, seed: "valley", icon: AlertTriangle, iconColor: "text-orange-600", bgColor: "bg-orange-50" },
  { id: 5, name: "The Apothecarium", location: "Lodi, NJ", eventTitle: "Competitor Moving Fast", eventDetail: "Your Brand not moving (0 WoW)", score: 64, seed: "apothecarium", icon: TrendingUp, iconColor: "text-amber-600", bgColor: "bg-amber-50" },
  { id: 6, name: "The Botanist", location: "Atlantic City, NJ", eventTitle: "Competitor Moving Fast", eventDetail: "Your Brand moving slower (-10 vs -40 WoW)", score: 55, seed: "botanist", icon: Activity, iconColor: "text-amber-600", bgColor: "bg-amber-50" },
  { id: 7, name: "Zen Leaf", location: "Elizabeth, NJ", eventTitle: "New Growing Shop", eventDetail: "Revenue spike • Your Brand not stocked", score: 48, seed: "zenleaf", icon: Zap, iconColor: "text-blue-600", bgColor: "bg-blue-50" },
  { id: 8, name: "Harmony Dispensary", location: "Secaucus, NJ", eventTitle: "New Growing Shop", eventDetail: "Your Brand not stocked", score: 42, seed: "harmony", icon: Zap, iconColor: "text-blue-600", bgColor: "bg-blue-50" },
  { id: 9, name: "Curaleaf", location: "Bellmawr, NJ", eventTitle: "Competitor Moving Fast", eventDetail: "Your Brand moving slower (-5 vs -15 WoW)", score: 35, seed: "curaleaf", icon: Activity, iconColor: "text-slate-600", bgColor: "bg-slate-50" },
  { id: 10, name: "Ascend Cannabis", location: "Rochelle Park, NJ", eventTitle: "Competitor Moving Fast", eventDetail: "Your Brand moving slower (-2 vs -8 WoW)", score: 22, seed: "ascend", icon: Activity, iconColor: "text-slate-600", bgColor: "bg-slate-50" },
];

const CircularProgress = ({ value }: { value: number }) => {
  const [progress, setProgress] = useState(0);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    // Animate the progress bar on mount
    const timer = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  let colorClass = "text-blue-500";
  let bgClass = "text-blue-100";
  if (value >= 75) {
    colorClass = "text-orange-500";
    bgClass = "text-orange-100";
  } else if (value >= 40) {
    colorClass = "text-amber-500";
    bgClass = "text-amber-100";
  }

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 48 48">
        <circle
          className={bgClass}
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
        <circle
          className={`${colorClass} transition-all duration-1000 ease-out`}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
      </svg>
      <span className="absolute text-sm font-bold text-gray-800">{value}</span>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Store
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Last Event
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Priority Score
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {initialStores.map((store) => {
                  const Icon = store.icon;
                  return (
                    <tr key={store.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-lg object-cover border border-gray-200 shadow-sm"
                              src={`https://picsum.photos/seed/${store.seed}/100/100`}
                              alt={`${store.name} logo`}
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{store.name}</div>
                            <div className="text-xs text-gray-500 flex items-center mt-0.5">
                              <MapPin className="w-3 h-3 mr-1" />
                              {store.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${store.bgColor} mr-3`}>
                            <Icon className={`w-4 h-4 ${store.iconColor}`} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{store.eventTitle}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{store.eventDetail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center">
                          <CircularProgress value={store.score} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
