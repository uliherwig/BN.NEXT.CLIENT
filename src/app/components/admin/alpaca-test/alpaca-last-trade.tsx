"use client";
import { useEffect, useMemo, useState } from 'react';
import { useDictionary } from '@/app/provider/dictionary-provider';
import CircularLoader from "@/app/components/common/loader";
import CheckboxSlate from '../../common/checkbox/checkbox-slate';
import WidgetButton from '../../common/buttons/widget-button';
import { AlpacaTradeModel } from '@/app/models/alpaca/alpaca-trade-model';
import { basicFetch, fetcher } from '@/app/lib/fetchFunctions';

interface AlpacaLastTradeProps {
    assetOptions: any[]
}

const AlpacaLastTrade: React.FC<AlpacaLastTradeProps> = ({ assetOptions }) => {



    const dictionary = useDictionary();

    const [loading, setLoading] = useState<boolean>(true);
    const [alpacaTrade, setAlpacaTrade] = useState<AlpacaTradeModel>()
    const [selectedAsset, setSelectedAsset] = useState<string>('SPY');

    const handleAssetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAsset(e.target.value);
    };

    const getLastTrade = async (source: string) => {

        const trade = await basicFetch<AlpacaTradeModel>(`/api/admin/alpaca-test?method=alpaca-trade&asset=${selectedAsset}`);
        setAlpacaTrade(trade);

    }

    useEffect(() => {
        setLoading(false);
    }, [assetOptions]);


    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="component-container">
            <div className="text-component-head mb-2">Alpaca Last Trade</div>
            <div className="h-[95%] w-full overflow-hidden">
                {loading && (
                    <CircularLoader />
                )}
                {!loading && assetOptions && (
                    <div className="h-full overflow-auto">
                        <div className="mb-4">
                            <label htmlFor="asset-select" className="block text-sm font-medium mb-1">Select Asset</label>
                            <select
                                id="asset-select"
                                value={selectedAsset}
                                onChange={handleAssetChange}
                                className="w-full p-2 border bg-white"
                            >
                                {assetOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <WidgetButton type='button' label='Get Trade' method={() => getLastTrade('alpaca')} disabled={selectedAsset == ''} />

                        {alpacaTrade &&
                            <div>
                                <table>
                                    <tr><td>Symbol</td> <td>{alpacaTrade.symbol}</td></tr>
                                    <tr><td>Timestamp (UTC)</td><td>
                                        {(() => { const d = new Date(alpacaTrade.timestampUtc).toISOString(); return d.substring(8, 10) + '.' + d.substring(5, 7) + ' ' + d.substring(11, 16); })()}
                                    </td></tr>
                                    <tr><td>Price</td>    <td>{alpacaTrade.price}</td></tr>
                                    <tr><td>Size</td> <td>{alpacaTrade.size}</td></tr>
                                    <tr> <td>Trade ID</td> <td>{alpacaTrade.tradeId}</td></tr>
                                </table>

                            </div>}
                    </div>



                )}
            </div>
        </div >
    );

}

export default AlpacaLastTrade;
