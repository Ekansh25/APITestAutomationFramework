import { IInterfaceProps } from "./LandingPage"

const APIList = (props:IInterfaceProps) => {
  return (
    props.option=="Default"?<div>APIList</div>:<></>
  )
}

export default APIList