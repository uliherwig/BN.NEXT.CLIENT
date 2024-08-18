// pages/alpaca-assets.tsx

import { AlpacaAsset } from '@/model/AlpacaAsset';
import AssetList from '@/components/alpaca/assets/AssetList';
import { alpacaTradingService } from '@/service/alpacaTradingService';

const AlpacaAssets = async () => {
    const assets: AlpacaAsset[] = await alpacaTradingService.getAssets();   
 
    return (
        <div className="flex h-full bg-white p-3 px-5">
            <AssetList assets={assets}  />
        </div>
    );
};

export default AlpacaAssets;