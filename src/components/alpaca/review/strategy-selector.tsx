"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";
import { basicFetch } from '@/app/lib/fetchFunctions';
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { StrategyInfo } from '@/models/strategy/strategy-info';
import { StrategyEnum } from '@/models/strategy/enums';
import { set } from 'date-fns';
import { start } from 'repl';

interface StrategySelectorProps {
    selectStrategy: any;
}

interface StrategyFilter {
    id: StrategyEnum;
    label: string;
}

const StrategySelector: React.FC<StrategySelectorProps> = ({ selectStrategy }) => {

    const dictionary = useDictionary();

    const [strategyName, setStrategyName] = useState("None");
    const [strategyFilter, setStrategyFilter] = useState(StrategyEnum.None);
    const [strategyInfos, setStrategyInfos] = useState<StrategyInfo[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const selectStrategyInfo = async (info: StrategyInfo) => {
        setStrategyName(info.label);
        selectStrategy(info)
    }

    const filterStrategy = async (e: any) => {
        setLoading(true);
        setStrategyFilter(e.target.value);
        await loadStrategyInfos(e.target.value);
    }

    const loadStrategyInfos = async (filter: number) => {
        const strategyInfos = await basicFetch<StrategyInfo[]>(`/api/strategy/infos?strategyType=${filter}`);
        setStrategyInfos(strategyInfos);
        selectStrategyInfo(strategyInfos[0]);
        setLoading(false);
    }

    useEffect(() => {
        loadStrategyInfos(0);
        setLoading(false);
    }, []);

    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="component-container">
            <div className="text-component-head mb-2">Selected Strategy : {strategyName} </div>

            {loading && (
                <CircularLoader />
            )}
            {!loading && (
                <div className="h-full w-full overflow-auto flex">
                    <div className='flex-1 pt-2'>
                        <Autocomplete
                            options={strategyInfos}
                            size="small"
                            sx={{ width: 200 }}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    selectStrategyInfo(newValue);
                                }
                            }}
                            renderInput={(params) => <TextField {...params} label="Select Strategy" />}
                        /></div>
                    <div className='flex-1'>
                        {/* <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                            <InputLabel id="demo-select-small-label">Select Strategy Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={strategyFilter}
                                label="Select Strategy Type"
                                onChange={filterStrategy}
                            >
                                <MenuItem value={StrategyEnum.None}>All</MenuItem>
                                <MenuItem value={StrategyEnum.Breakout}>Breakout</MenuItem>
                                <MenuItem value={StrategyEnum.SMA}>SMA</MenuItem>
                            </Select>
                        </FormControl> */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default StrategySelector;