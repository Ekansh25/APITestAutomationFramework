import {
    BriefcaseIcon,
    //CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    //CurrencyDollarIcon,
    //LinkIcon,
    //MapPinIcon,
    PencilIcon,
} from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { IInterfaceProps } from './LandingPage'
import { useEffect, useState } from 'react'

export default function Example(props: IInterfaceProps) {
    const [colorClassCreate, setColorClassCreate] = useState<string>(" text-gray-500 ");
    const [colorClassDefault, setColorClassDefault] = useState<string>(" text-gray-500 ");
    const [colorClassExecute, setColorClassExecute] = useState<string>(" text-gray-500 ");
    const resetAllClass = () => {
        setColorClassCreate(" text-gray-500 ");
        setColorClassDefault(" text-gray-500 ");
        setColorClassExecute(" text-gray-500 ");
    }
    useEffect(()=>{
        resetAllClass();
        switch(props.option){
            case "Default":
                setColorClassDefault(" text-gray-900 ");
                break;
            case "Create":
                setColorClassCreate(" text-gray-900 ");
                break;
            case "Execute":
                setColorClassExecute(" text-gray-900 ");
                break;
        }
    },[props.option])
    return (
        <div className="lg:flex lg:items-center lg:justify-between h-[10vh]">
            <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight text-left" onClick={()=>{props.setOption&&props.setOption("Default")}}>
                <button>
                    Test Case Automation
                </button>
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                    <button className={"mt-2 flex items-center text-sm" + colorClassDefault} onClick={()=>{props.setOption&&props.setOption("Default")}}>
                        <BriefcaseIcon aria-hidden="true" className={"mr-1.5 h-5 w-5 flex-shrink-0"} />
                        test-cases
                    </button>
                    <button className={"mt-2 flex items-center text-sm" + colorClassCreate} onClick={()=>{props.setOption&&props.setOption("Create")}}>
                        <BriefcaseIcon aria-hidden="true" className={"mr-1.5 h-5 w-5 flex-shrink-0"} />
                        create-test-cases
                    </button>
                    <button className={"mt-2 flex items-center text-sm"+colorClassExecute} onClick={()=>{props.setOption&&props.setOption("Execute")}}>
                        <PencilIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0" />
                        execute-test-cases
                    </button>
                    {/* <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CurrencyDollarIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                        $120k &ndash; $140k
                    </div> */}
                    {/* <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarIcon aria-hidden="true" className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                        Closing on January 9, 2020
                    </div> */}
                </div>
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
                {/* <span className="hidden sm:block">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <PencilIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                        Edit
                    </button>
                </span> */}

                {/* <span className="ml-3 hidden sm:block">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        <LinkIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                        View
                    </button>
                </span> */}

                <span className="sm:ml-3">
                    {props.option=="Create"&&<button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <CheckIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
                        Create
                    </button>}
                </span>

                {/* Dropdown */}
                <Menu as="div" className="relative ml-3 sm:hidden">
                    <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                        More
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" />
                    </MenuButton>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <MenuItem>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                Edit
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                View
                            </a>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    )
}
