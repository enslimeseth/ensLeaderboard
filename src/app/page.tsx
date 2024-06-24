
import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Dune } from 'dune-api-client'
import { Analytics } from "@vercel/analytics/react"

const dune = new Dune(process.env.DUNE_API_KEY)

type DuneData = {
  rank: number
  username: string
  display: string
  followers: number
  pfp?: string
}

export default async function Home() {
  const duneQueryId = 3588381
  const res = await dune.results<DuneData>(duneQueryId);
  const data = res.result?.rows

  if (!data) {
    return <p>No data</p>
  }

  return (
    <div className="mt-10">
      <h1 className="text-center text-xl text-black font-semibold">
        <span className="text-[#7D98F2]">.eth</span> Leaderboard for
        <span className="text-[#432B8C]"> Farcaster</span>
      </h1>
      <h2 className="text-center mb-4">The most followed Farcaster accounts with .eth usernames</h2>
      
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
            {data.length > 0 ? data.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-left">{item.rank}</td>
                <td className="px-4 py-2 text-left">
                  <Link className="underline decoration-[#7D98F2]" href={`https://app.ens.domains/${item.username}`}>
                    {item.username}
                  </Link>
                </td>
                <td className="px-4 py-2 text-left">
                  <div className="flex flex-row items-center gap-2">
                    <img src={item.pfp || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYYJaCm3AVvBJ8JcaAS_oCNHWM9RQbt1m_UvuNdvs9-g&s"} alt={`PFP for ${item.username} on Farcaster`} className="w-4 h-4 rounded-full" width={16} height={16} />
                    <Link className="underline decoration-[#432B8C]" href={`https://warpcast.com/${item.username}`}>
                      {item.display}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-2 text-left">{Number(item.followers).toLocaleString()}</td>
              </tr>
            )) : <tr><td colSpan={4}>Loading...</td></tr>}
          </tbody>
        </table>
        <div className="pt-4 pb-4">
        <Link href="https://github.com/dbrooo/ensLeaderboard">
          <p className="text-center underline">View on GitHub</p>
        </Link>
      </div>
      </div>
    </div>
  );
}