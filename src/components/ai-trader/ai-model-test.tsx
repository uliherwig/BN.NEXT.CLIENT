"use client";
import { useEffect, useState } from 'react';
import { useDictionary } from '@/provider/dictionary-provider';
import 'react-toastify/dist/ReactToastify.css';
import CircularLoader from "@/components/common/loader";
import { AiModel } from '@/models/strategy/ai-model';
import { TimeFrameEnum } from '@/models/strategy/enums';
import ConfigurableForm from "@/components/forms/configurable-form";
import { useFormState } from 'react-dom';
import { runAiTest } from '@/app/actions/aitrade';
import { useSignalR } from '@/provider/signalr-provider';
import { FormConfig } from '@/models/forms/standard';


interface AiModelTestProps {
    model: AiModel | null
}

const aiTestForm : FormConfig = {
    "formId": "aiTestForm",
    "title": "Test with custom settings",
    "fields": [
        {
            "name": "name",
            "label": "Name",
            "type": "text",
            "placeholder": "e.g. Test Run 1",
            "required": true,
            "defaultValue": "Test Run 1",
            "validation": {
                "minLength": 3,
                "maxLength": 50
            }
        },
        {
            "name": "broker",
            "label": "Broker",
            "type": "select",
            "required": true,
            "defaultValue": "Alpaca",
            "options": [
                { "value": "Alpaca", "label": "Alpaca" },
                { "value": "td_ameritrade", "label": "TD Ameritrade" },
                { "value": "binance", "label": "Binance" },
                { "value": "oanda", "label": "OANDA" },
                { "value": "xtb", "label": "XTB" },
                { "value": "plus500", "label": "Plus500" }
            ]
        },
        {
            "name": "startDate",
            "label": "Date From",
            "type": "date",
            "required": true,
            "defaultValue": "2024-01-01"
        },
        {
            "name": "endDate",
            "label": "Date To",
            "type": "date",
            "required": true,
            "defaultValue": new Date().toISOString().split("T")[0]
        },
        {
            "name": "takeProfitPercent",
            "label": "Take Profit (%)",
            "type": "number",
            "placeholder": "e.g. 1.5",
            "required": true,
            "defaultValue": 1.0,
            "validation": {
                "min": 0.01,
                "max": 1
            }
        },
        {
            "name": "stopLossPercent",
            "label": "Stop Loss (%)",
            "type": "number",
            "placeholder": "e.g. 1.0",
            "required": true,
            "defaultValue": 1.0,
            "validation": {
                "min": 0.01,
                "max": 1
            }
        }, {
            "name": "quantity",
            "label": "Quantity",
            "type": "number",
            "placeholder": "e.g. 1.0",
            "required": true,
            "defaultValue": 1.0,
            "validation": {
                "min": 1,
                "max": 50
            }
        }
    ]
};

const AiModelTest: React.FC<AiModelTestProps> = ({ model }) => {
    const dictionary = useDictionary();
    const { isConnected } = useSignalR();

    const [pending, setPending] = useState<boolean>(false);
    const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
    const [state, storeAction] = useFormState<any, FormData>(runAiTest, { message: '', success: false, errors: {} });


    const [loading, setLoading] = useState<boolean>(true);
    const handleSubmit = (data: any) => {

        console.log('model DATA', model?.id);
        // if (data instanceof FormData) {
        //     data.append('modelId', model ? model.id : '');
        //     data.append('asset', model ? model.execution_params.asset : '');
        // } else if (typeof data === 'object' && data !== null) {
        //     data.modelId = model ? model.id : '';
        //     data.asset = model ? model.execution_params.asset : '';
        // }

        data.modelId = model ? model.id : '';
        data.asset = model ? model.execution_params.asset : '';
        data.timeFrame = model ? model.execution_params.time_frame : '';
      
        storeAction(data);
        // Optionally, you can set pending or isTestRunning here if needed
        // setPending(true);
        // setIsTestRunning(true);
    };

    useEffect(() => {

        aiTestForm.fields[4].defaultValue = model ? model.execution_params.tp : 1.0;
        aiTestForm.fields[5].defaultValue = model ? model.execution_params.sl : 1.0;
        if (model) {
            setLoading(false);
        }
        // setLoading(false);
    }, [model]);

    const TABLE_HEAD = ['Name', 'TimeFrame', 'Return', 'Sharpe Ratio', 'Max DD', 'Model'];

    if (!dictionary) {
        return <div>Loading...</div>;
    }
    return (
        <div className="component-container">
            <div className="text-component-head mb-2">AI Model Test</div>
            <h2>SignalR Status: {isConnected ? "Connected" : "Disconnected"}</h2>
            <div className="h-[95%] w-full overflow-hidden">
                {loading && (
                    <CircularLoader />
                )}
                {!loading && (
                    <div className="h-full overflow-auto">
                        {/* example table */}

                        <table className="min-w-full table-fixed border">
                            <thead className="bg-slate-700 sticky top-[-2px] z-50" >
                                <tr className='text-white text-xs'>
                                    {TABLE_HEAD.map((column, index) => (
                                        <th key={column} className={index === 0 ? "px-2 py-1 text-left" : "px-2 py-1 text-center"}>
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className='text-slate-800 text-sm overflow-y' >

                                <tr className="border-b">
                                    <td className="px-2 py-1">{model?.name}</td>
                                    <td className=" py-1 text-center">{model ? TimeFrameEnum[model.execution_params.time_frame] : ''}</td>
                                    <td className="py-1 text-center">
                                        {model ? model.total_return_percentage.toFixed(2) + '%' : ''}
                                    </td>
                                    <td className=" py-1 text-center">
                                        {model ? model.sharpe_ratio.toFixed(2) : ''}
                                    </td>
                                    <td className=" py-1 text-center">
                                        {model ? model.max_drawdown.toFixed(2) + '%' : ''}
                                    </td>
                                    <td className=" py-1 text-center">
                                        LGB
                                    </td>

                                </tr>

                            </tbody>
                        </table>


                        <div className="mt-4">
                            <ConfigurableForm config={aiTestForm} onSubmit={handleSubmit} />
                        </div>


                    </div>

                )}
            </div>
        </div>
    );

}

export default AiModelTest;