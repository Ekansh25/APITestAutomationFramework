export interface IInterfaceProps {
    option: string;
    setOption?: (value: string) => void;
    format?: ITypeObject
    setFormat?: (value:ITypeObject) => void;
}


export interface ITypeResponse {
    type: string;
    properties: object;
    required: string[];
}

export interface ITypeObject {
    schema: ITypeResponse;
    expectedResponse: object;
}

export interface ITypeTestData {
    statusCode: number;
    isStatusCodeValid: boolean;
    responseBody: object;
    isResponseBodyValid: boolean;
    isResponseBodyStructureValid: boolean;
    errorMessages: string[];
    isResponseDataMatching: boolean;
    mismatchDetails: object;
}

export interface ITypeFormatWindow {
    bodyStructure: object;
}

export interface ITypeJsonFunctionPorp {
    updated_src: object
    name: string, //new var name
    namespace: string[], //list, namespace indicating var location
    new_value: object, //new variable value
    existing_value: object, //existing variable value
}