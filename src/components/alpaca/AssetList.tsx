"use client"
import React, { useState } from 'react';
import { Asset } from '@/model/Asset';

interface AssetListProps {
  assets: Asset[];
}

const AssetList: React.FC<AssetListProps> = ({ assets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TABLE_HEAD = ["Symbol", "Name"];

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex  justify-between" >
        <div className=" text-blue-900 text-lg font-bold">Assets</div>
        <div className='flex flex-'>
          <input
            type="text"
            className="w-[150px] border border-violet-400 rounded-md p-0.5 pl-2 text-blue-900"
            value={searchTerm}
            placeholder='Search...'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="h-full w-full  overflow-hidden pt-5">
        <div className="h-full overflow-auto">
          <table className="min-w-full table-fixed border">
            <thead className="bg-violet-800 sticky top-0">
              <tr>
                {TABLE_HEAD.map((column) => (
                  <th key={column} className="px-4 py-2 text-left">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='text-neutral-800 text-sm'>
              {filteredAssets.map((row, index) => (
                <tr
                  key={row.symbol}
                  className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-neutral-300' : 'bg-white'}`}
                >
                  <td className="px-4 py-1">{row.symbol}</td>
                  <td className="px-4 py-1 text-xs">{row.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetList;