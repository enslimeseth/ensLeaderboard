"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  type LeaderboardItem = {
    rank: string;
    eth_name: string;
    display: string;
    follower_count: string;
  }

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[] | null>(null);

  useEffect(() => {
    async function getData(){
      const data = await axios.get('https://api.farcasterkit.com/users/ensLeaderboard');
      if(data){
        const final = data.data.leaderboard as LeaderboardItem[];
        setLeaderboardData(final)
      }
    } 
    getData();
  }, []); // Ensure the effect runs only once

  return (
    <div className="mt-10"> {/* Adjust the number for more or less space */}
      <h1 className="text-center text-xl text-black font-semibold"> <span style={{color: 'rgb(125 152 242)' }}> .eth </span> Leaderboard for <span style={{color: 'rgb(67 43 140)' }}> Farcaster</span>
      </h1>
      <h2 className="text-center">The most followed Farcaster accounts with .eth Farcaster names</h2>

      <hr />

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
                <td className="px-4 py-2 text-left">{item.eth_name}</td>
                <td className="px-4 py-2 text-left">{item.display}</td>
                <td className="px-4 py-2 text-left">{Number(item.follower_count).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
