"use client"
import React, { Suspense, use, useEffect, useState } from 'react';
import { BnOhlc } from '@/model/BnOhlc';
import useSWR, { mutate } from 'swr';
import { AlpacaAsset } from '@/model/AlpacaAsset';
import { alpacaClientService } from '@/service/alpacaClientService';

interface AssetListProps {
  assets: AlpacaAsset[];
}


const AssetList: React.FC<AssetListProps> = ({ assets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [assetList, setAssetList] = useState(assets);



  // const url = `/api/alpaca/assets?symbol=${toggleAssetSelectionUrl}`;




  const filteredAssets = assetList.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelected = async (assetSymbol: string) => {
    console.log('toggling asset:', assetSymbol);

    setAssetList(prevAssets =>
      prevAssets.map(asset =>
        asset.symbol === assetSymbol ? { ...asset, isSelected: !asset.isSelected } : asset
      )
    );

    await alpacaClientService.toggleAssetSelection(assetSymbol);

  };

  useEffect(() => {
    setAssetList(assets);
  }, [assets]);

  const TABLE_HEAD = ["Symbol", "Name"];

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full flex justify-between">
        <div className="text-slate-800 text-lg font-bold">Assets</div>
        <div className='flex'>
          <input
            type="text"
            className="w-[150px] border border-slate-500 p-0.5 pl-2 text-slate-900"
            value={searchTerm}
            placeholder='Search...'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="h-full w-full overflow-hidden pt-5">
        <div className="h-full overflow-auto">
          <table className="min-w-full table-fixed border">
            <thead className="bg-slate-700 sticky top-0">
              <tr>
                {TABLE_HEAD.map((column) => (
                  <th key={column} className="px-4 py-2 text-left text-slate-100">
                    {column}
                  </th>
                ))}
                <th className="px-4 py-2 text-left text-slate-100"></th>
              </tr>
            </thead>
            <tbody className='text-neutral-800 text-sm overflow-y' >
              {filteredAssets.map((asset, index) => (
                <tr
                  key={asset.symbol}
                  className={`hover:bg-zinc-200 ${index % 2 === 1 ? 'bg-neutral-300' : 'bg-white'}`}
                >
                  <td className="px-4 py-1">{asset.symbol}</td>
                  <td className="px-4 py-1 text-xs">{asset.name}</td>
                  <td className="px-4 py-1">
                    <input
                      className='cursor-pointer w-4 h-4'
                      type='checkbox'
                      onChange={() => toggleSelected(asset.symbol)}
                      checked={asset.isSelected}
                    />
                  </td>
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