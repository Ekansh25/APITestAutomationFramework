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