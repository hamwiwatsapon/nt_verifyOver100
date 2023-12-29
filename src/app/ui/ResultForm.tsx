"use client";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import React, { ChangeEvent,} from 'react';

interface IProps {
    data: JSON;
}

const ResultForm: React.FC<IProps> = ({ data }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
                <div className="w-1/2">
                    <h2 className="text-xl font-bold">Table 1</h2>
                    <ul>
                        {/* {tableData.map((data, index) => (
                            <li key={index} className="border p-2">{data}</li>
                        ))} */}
                    </ul>
                </div>
                <div className="w-1/2">
                    <h2 className="text-xl font-bold">Table 2</h2>
                    {/* <input 
                        type="text" 
                        value={inputData} 
                        onChange={(e) => setInputData(e.target.value)} 
                        className="border p-2"
                    /> */}
                    <button onClick={console.log("hi")} className="bg-blue-500 text-white p-2 mt-2">Add Data</button>
                </div>
            </div>
            <div className="flex flex-row gap-4">
                <div className="w-1/2">
                    <h2 className="text-xl font-bold">Bottom Table 1</h2>
                    {/* Add your code for Bottom Table 1 here */}
                </div>
                <div className="w-1/2">
                    <h2 className="text-xl font-bold">Bottom Table 2</h2>
                    {/* Add your code for Bottom Table 2 here */}
                </div>
            </div>
        </div>
    );
};

export default ResultForm;
