import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { ITypeFormatWindow } from './types.interface';

const FormatWindow = (props: ITypeFormatWindow) => {

    const toggleDiv = (event: React.MouseEvent<HTMLLIElement>) => {
        const liElement = event.currentTarget;
        const secondDiv = liElement.querySelector('.second-div');
        if (secondDiv) {
            secondDiv.classList.toggle('hidden');
        }
    };

    const jsonData = [
        {
            description: "This test case ensures that the API endpoint returns the expected HTTP status code. It validates the correct behavior of the API, confirming that it responds appropriately to requests, such as delivering a [200 OK] for successful operations, a [404 Not Found] for non-existent resources, or a [500 Internal Server Error] in the event of server-side issues.", title: "Status code validation"
        },
        {
            description: "This test case verifies that the API's response is a well-formed JSON object. It confirms the structural integrity of the response, ensuring that the data is returned in a proper JSON format that can be parsed and processed without errors.", title: "Schema Validation", isProp: true
        },
        {
            description: "This test case validates that the API response adheres to the predefined schema. It checks the correctness of data types and ensures the presence of all required fields, while also verifying that optional fields are handled as specified. This guarantees that the API delivers data in the expected and standardized format.", title: "Structure Validation"
        },
        {
            description: "This test case performs a data integrity check by comparing the current API response with the data initially captured when the test case was created. It ensures that the API consistently returns accurate and unaltered data over time, safeguarding against unintended modifications or anomalies in the response.", title: "Data Validation"
        },
    ]

    return (
        <>
            {jsonData.map((item) => (
                <ul>
                    <li onClick={toggleDiv}>
                        <div className="w-auto h-auto bg-indigo-200 m-2 rounded-md flex justify-between group/item hover:bg-indigo-300 group/edit">
                            <div className='m-2'>{item.title}</div>
                            <div className='my-auto'>
                                <ChevronDownIcon className='size-6 text-slate-50' />
                            </div>
                        </div>
                        <div id='' className='m-2 bg-white rounded-md p-2 second-div hidden overflow-y-auto max-h-[18rem]'>
                            <p className='my-2'><b>Description: </b>{item.description}</p>
                            {item?.isProp&&<pre className='bg-indigo-50 rounded-md p-2 m-1'><b>Schema: </b>{JSON.stringify(props.bodyStructure, null, 2)}</pre>}
                            <button className="bg-indigo-200 rounded-md p-1 ml-[90%]">
                                <span className="group-hover/edit:text-gray-700 text-sm"><b>Create</b></span>
                            </button>
                        </div>
                    </li>
                </ul>
            ))}
        </>
    )
}

export default FormatWindow