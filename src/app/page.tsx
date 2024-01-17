"use client"
import axios from 'axios';
import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';

const BASE_API_URL = 'https://api.farcasterkit.com';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface LeaderboardItem {
  rank: string;
  eth_name: string;
  display: string;
  pfp: string | null;
  fid: number;
  follower_count: string;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, error } = useSWR(`${BASE_API_URL}/users/ensLeaderboard?cursor=${currentPage * 100}`, fetcher);

  const handleNext = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(prevPage => prevPage > 0 ? prevPage - 1 : 0);
  };

  if (error) return <div>Failed to load</div>;

  const leaderboardData: LeaderboardItem[] = data?.leaderboard || [];

  return (
    <div className="mt-10">
      <h1 className="text-center text-xl text-black font-semibold">
        <span className="text-[#7D98F2]">.eth</span> Leaderboard for
        <span className="text-[#432B8C]"> Farcaster</span>
      </h1>
      <h2 className="text-center">The most followed Farcaster accounts with .eth usernames</h2>
      <div className="flex justify-center items-center mt-2 mb-4">
        <ArrowLeftCircleIcon onClick={handlePrevious} className="mr-2 w-6 h-6" color="#806AED" />
        <ArrowRightCircleIcon onClick={handleNext} className="mr-2 w-6 h-6" color="#806AED" />
      </div>
      <div className="overflow-x-auto px-0 md:px-16">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Display Name</th>
              <th className="px-4 py-2 text-left">Followers</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {leaderboardData.length > 0 ? leaderboardData.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-left">{item.rank + (currentPage * 100)}</td>
                <td className="px-4 py-2 text-left">
                  <Link className="underline decoration-[#7D98F2]" href={`https://app.ens.domains/${item.eth_name}`}>
                    {item.eth_name}
                  </Link>
                </td>
                <td className="px-4 py-2 text-left">
                  <div className="flex flex-row items-center gap-2">
                    <Image src={item.pfp || ""} alt={`PFP for ${item.eth_name} on Farcaster`} className="w-4 h-4 rounded-full" width={16} height={16} />
                    <Link className="underline decoration-[#432B8C]" href={`https://warpcast.com/${item.eth_name}`}>
                      {item.display}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-2 text-left">{Number(item.follower_count).toLocaleString()}</td>
              </tr>
            )) : <tr><td colSpan={4}>Loading...</td></tr>}
          </tbody>
        </table>
        <div className="pt-4 pb-4">
        <Link href="https://github.com/enslimeseth/ensLeaderboard">
          <p className="text-center underline">View on GitHub</p>
        </Link>
      </div>
      </div>
    </div>
  );
}