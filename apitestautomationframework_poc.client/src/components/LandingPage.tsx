import Header from './Header';
import CreateTestCase from './CreateTestCase';
import ExecuteTestCase from './ExecuteTestCase';
import { useState } from 'react';
import TestCasesList from './TestCasesList';

export interface IInterfaceProps {
    option: string;
    setOption?: (value: string) => void;
}

const LandingPage = () => {
    const [selectedOption, setSelectedOption] = useState<string>("Default");
    return (
        <>
            <Header option={selectedOption} setOption={setSelectedOption} />
            <CreateTestCase option={selectedOption} />
            <ExecuteTestCase option={selectedOption} />
            <TestCasesList option={selectedOption}/>
        </>
    )
}

export default LandingPage;