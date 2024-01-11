"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  type LeaderboardItem = {
    rank: string;
    eth_name: string;
    display: string;
    pfp: string;
    follower_count: string;
  };

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[] | null>(null);
  const [cursor, setCursor] = useState<number>(0);

  useEffect(() => {
    async function getData(cursor: number) {
      const localRoute = `https://api.farcasterkit.com/users/ensLeaderboard?cursor=${cursor}`;
      const data = await axios.get(localRoute);
      if (data) {
        const final = data.data.leaderboard as LeaderboardItem[];
        setLeaderboardData(final);
      }
    }
    getData(cursor);
  }, [cursor]);

  const handleNext = () => {
    setCursor((prevCursor) => prevCursor + 100);
  };

  const handlePrevious = () => {
    setCursor((prevCursor) => (prevCursor > 0 ? prevCursor - 100 : 0));
  };

  return (
    <div className="mt-10">
      <h1 className="text-center text-xl text-black font-semibold">
        <span className="text-[#7D98F2]">.eth</span> Leaderboard for
        <span className="text-[#432B8C]"> Farcaster</span>
      </h1>
      <h2 className="text-center">The most followed Farcaster accounts with .eth Farcaster names</h2>
      <div className="flex justify-center mt-4">
        <button onClick={handlePrevious} className="mr-2">Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <div className="flex justify-center w-full overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">ENS Name</th>
              <th className="px-4 py-2 text-left">Display Name</th>
              <th className="px-4 py-2 text-left">Followers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {leaderboardData !== null && leaderboardData.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-left">{item.rank}</td>
                <td className="px-4 py-2 text-left">
                  <Link className="underline decoration-[#7D98F2]" href={`https://app.ens.domains/${item.eth_name}`}>
                    {item.eth_name}
                  </Link>
                </td>
                <td className="px-4 py-2 text-left">
                  <div className="flex flex-row items-center gap-2">
                    <Image src={item.pfp} alt={`PFP for ${item.eth_name} on Farcaster`} className="w-4 h-4 rounded-full" width={12} height={12} />
                    <Link className="underline decoration-[#432B8C]" href={`https://warpcast.com/${item.eth_name}`}>
                      {item.display}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-2 text-left">{Number(item.follower_count).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}