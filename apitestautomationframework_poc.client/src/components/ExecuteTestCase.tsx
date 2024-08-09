import { IInterfaceProps } from './LandingPage'

//type Props = {}

const ExecuteTestCase = (props:IInterfaceProps) => {
    return (
        props.option==""?<div>ExecuteTestCase</div>:<></>
    )
}

export default ExecuteTestCase