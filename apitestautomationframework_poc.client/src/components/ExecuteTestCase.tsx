import { IInterfaceProps } from './LandingPage'

//type Props = {}

const ExecuteTestCase = (props:IInterfaceProps) => {
    return (
        props.option=="Execute"?<div>ExecuteTestCase</div>:<></>
    )
}

export default ExecuteTestCase