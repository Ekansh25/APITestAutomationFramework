import Header from './Header';
import CreateTestCase from './CreateTestCase';
import ExecuteTestCase from './ExecuteTestCase';
import { useState } from 'react';
import TestCasesList from './TestCasesList';
import { ITypeObject } from './types.interface';

const LandingPage = () => {
    const [selectedOption, setSelectedOption] = useState<string>("Default");
    const [format, setFormat] = useState<ITypeObject>();
    return (
        <>
            <Header option={selectedOption} setOption={setSelectedOption} />
            <CreateTestCase option={selectedOption} setFormat={setFormat} format={format}/>
            <ExecuteTestCase option={selectedOption} format={format}/>
            <TestCasesList option={selectedOption}/>
        </>
    )
}

export default LandingPage;