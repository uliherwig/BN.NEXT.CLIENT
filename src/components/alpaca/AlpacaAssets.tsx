// pages/alpaca-assets.tsx

import { Asset } from '@/model/Asset';
import AssetList from '@/components/alpaca/AssetList';
import { alpacaTradingService } from '@/service/alpacaTradingService';



const AlpacaAssets = async () => {
    const assets : Asset[] = await alpacaTradingService.getAssets();
    const props = { assets };
      return (
          <div className="flex h-full items-stretch bg-white rounded-lg p-3">            
              <AssetList assets={assets} />
          </div>
      );
};



export default AlpacaAssets;