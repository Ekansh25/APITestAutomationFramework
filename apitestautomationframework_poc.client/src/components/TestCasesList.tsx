import { useState } from "react";
import { IInterfaceProps } from "./LandingPage";

const TestCaseList = [
    {
        url: "jsdnjdns",
        testCases: [{data:"",format:""},{data:"",format:""}]
    },
    {
        url: "jsdnjdns",
        testCases: [{data:"",format:""},{data:"",format:""}]
    },
    {
        url: "jsdnjdns",
        testCases: [{data:"",format:""},{data:"",format:""}]
    },
    {
        url: "jsdnjdns",
        testCases: [{data:"",format:""},{data:"",format:""}]
    },
]

const TestCasesList = (props: IInterfaceProps) => {
    const [isLoading, setIsloading] = useState<boolean>(false);
    return (
        props.option == "Default"? 
            <div>
                {isLoading ? <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div> : <div>
                    
                </div>}
            </div>
            : <></>
    )
}

export default TestCasesList;