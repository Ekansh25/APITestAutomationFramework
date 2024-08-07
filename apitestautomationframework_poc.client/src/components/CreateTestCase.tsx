import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';

//type Props = {}

const CreateTestCase = () => {

    const [isGet, setIsGet] = useState<boolean>(false);
    const [isPut, setIsPut] = useState<boolean>(false);
    const [isPost, setIsPost] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);

    const [colorClass, setColorClass] = useState<string>("");

    const setType = () => {
        setIsGet(false);
        setIsPut(false);
        setIsPost(false);
        setIsDelete(false);
    }

    useEffect(() => {
        setColorClass(isGet && " text-blue-500 " || isPut && " text-yellow-500 " || isPost && " text-green-500 " || isDelete && " text-red-500 " || " text-gray-900 ");
    }, [isGet, isPut, isPost, isDelete])

    const dropdown =
        <Menu as="div" className="relative inline-block text-left m-5 h-10">
            <div>
                <MenuButton className={"inline-flex w-24 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" + colorClass}>
                    {isGet && "GET" || isPut && "PUT" || isPost && "POST" || isDelete && "DELETE" || "Select"}
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
                            onClick={() => { setType(), setIsGet(true) }}
                        >
                            GET
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-yellow-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            onClick={() => { setType(), setIsPut(true) }}
                        >
                            PUT
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-green-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            onClick={() => { setType(), setIsPost(true) }}
                        >
                            POST
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-red-500 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            onClick={() => { setType(), setIsDelete(true) }}
                        >
                            DELETE
                        </a>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>;

    const input =
        <div className="relative flex w-full max-w-[40rem] m-5">
            <div className="relative h-10 w-full min-w-[200px]">
                <input type="email"
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" " value="" />
                <label
                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    API
                </label>
            </div>
            <button 
                className="!absolute right-1 top-1 select-none rounded bg-blue-gray-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button">
                Send
            </button>
        </div>;
        
    return (
        <div className='flex m-10'>
            {dropdown}
            {input}
        </div>
    )
}

export default CreateTestCase