import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon, ArrowRightCircleIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { IInterfaceProps } from './LandingPage';

//type Props = {}

interface ITypeResponse {
    type: string;
    properties: object;
    required: string[];
}

interface ITypeObject {
    schema: ITypeResponse;
    expectedResponse: object;
}

interface ITypeTestData {
    statusCode: number;
    isStatusCodeValid: boolean;
    responseBody: object;
    isResponseBodyValid: boolean;
    isResponseBodyStructureValid: boolean;
    errorMessages: string[];
    isResponseDataMatching: boolean;
    mismatchDetails: object;
}

const CreateTestCase = (props: IInterfaceProps) => {
    const [selectedType, setSelectedType] = useState<string>("GET");
    const [colorClass, setColorClass] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [format, setFormat] = useState<ITypeObject | null>(null);
    const [testData, setTestData] = useState<ITypeTestData | null>(null);
    //const url = "http://localhost:5066/WeatherForecast/pokemon-list";

    useEffect(() => {
        switch (selectedType) {
            case "GET":
                setColorClass(" text-blue-500 ");
                break;
            case "PUT":
                setColorClass(" text-yellow-500 ");
                break;
            case "POST":
                setColorClass(" text-green-500 ");
                break;
            case "DELETE":
                setColorClass(" text-red-500 ");
                break;
            default:
                setColorClass(" text-gray-900 ")
        }
    }, [selectedType])

    async function populateAPIResponse() {
        if(props.option == "Create") populateAPI();
        if(props.option == "Execute") populateAPITest();
    }

    async function populateAPI() {
        setIsLoading(true);
        try {
            const response = await fetch('APITest/create-schema', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: `${url}`,
                }),
            });

            const data: ITypeObject = await response.json();
            setFormat(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }
    const schema = {
        "count": {
            "type": "integer"
        },
        "next": {
            "type": "string"
        },
        "previous": {
            "type": "null"
        },
        "results": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "url": {
                        "type": "string"
                    }
                },
                "required": [
                    "name",
                    "url"
                ]
            }
        }
    };

    async function populateAPITest() {
        setIsLoading(true);
        try {
            const response = await fetch('APITest/run-tests', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: `${url}`,
                    schema: schema
                }),
            });

            const data: ITypeTestData = await response.json();
            setTestData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const dropdown =
        <Menu as="div" className="relative inline-block text-left h-[45px] justify-center items-center mr-[4px]">
            <div>
                <MenuButton className={"inline-flex w-24 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 h-[45px] items-center" + colorClass}>
                    {selectedType}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute z-10 mt-2 w-20 origin-bottom rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-blue-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 "
                            onClick={() => { setSelectedType("GET") }}
                        >
                            GET
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-yellow-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            onClick={() => { setSelectedType("PUT") }}
                        >
                            PUT
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-green-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            onClick={() => { setSelectedType("POST") }}
                        >
                            POST
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-red-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            onClick={() => { setSelectedType("DELETE") }}
                        >
                            DELETE
                        </a>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>;

    const input =
        <div className='w-3/4'>
            {/* <label htmlFor="hs-search-box-with-loading-2" className="block text-sm font-medium dark:text-white">Search</label> */}
            <div className="flex rounded-lg shadow-sm  ring-gray-300">
                <input type="text" id="input-url" onChange={(e) => setUrl(e.target.value)} name="hs-search-box-with-loading-2" className="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-800 dark:placeholder-neutral-500 " placeholder="Input API" />
                <button type="button" onClick={populateAPIResponse} className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus-visible:outline-indigo-600 focus:bg-indigo-800 disabled:opacity-50 disabled:pointer-events-none">
                    {isLoading ? <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span>
                    </span> : <ArrowRightCircleIcon className='size-8' />}
                </button>
            </div>
        </div>;

    const display =
        <div className='h-[70vh] flex'>
            <div className='bg-indigo-100 w-1/2 mr-1 rounded-md'>
                <h1 className='text-1xl font-bold leading-7 text-gray-900 m-1'>Response Body</h1>
                <div id="response-body-cont" className='bg-slate-100 mx-5 rounded-md h-[62vh] p-4 overflow-y-auto text-left'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        format && (
                            props.option=="Create"?
                            <pre>{JSON.stringify(format.expectedResponse, null, 2)}</pre>
                            :
                            <pre>{JSON.stringify(testData?.responseBody, null, 2)}</pre>
                        )
                    )}
                </div>
            </div>
            <div className='bg-indigo-100 w-1/2 ml-1 rounded-md'>
                <h1 className='text-1xl font-bold leading-7 text-gray-900 m-1'>{props.option=="Execute"?"Test Results":"Format"}</h1>
                <div id="response-format-cont" className='bg-slate-100 mx-5 rounded-md h-[62vh] p-4 overflow-y-auto text-left'>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        format && (
                            props.option=="Create"?
                            <pre>{JSON.stringify(format.schema, null, 2)}</pre>
                            :
                            <>
                                <pre>{JSON.stringify(testData?.statusCode, null, 2)}</pre>
                                <pre>{JSON.stringify(testData?.isStatusCodeValid, null, 2)}</pre>
                                <pre>{JSON.stringify(testData?.errorMessages, null, 2)}</pre>
                                <pre>{JSON.stringify(testData?.mismatchDetails, null, 2)}</pre>
                                <pre>{JSON.stringify(testData?.isResponseBodyValid, null, 2)}</pre>
                                <pre>{JSON.stringify(testData?.isResponseDataMatching, null, 2)}</pre>
                                <pre>{JSON.stringify(testData?.isResponseBodyStructureValid, null, 2)}</pre>
                            </>
                        )
                    )}
                </div>
            </div>
        </div>;

    return (
        <>
            <div className='flex justify-center items-center h-[10vh]'>
                {dropdown}
                {input}
            </div>
            {display}
        </>
    )
}

export default CreateTestCase