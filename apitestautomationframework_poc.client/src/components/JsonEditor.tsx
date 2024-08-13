import React from 'react';
import ReactJson from 'react-json-view';
import { ITypeJsonFunctionPorp } from './types.interface';

interface JsonEditorProps {
    data: object;
    onEdit: (edit: ITypeJsonFunctionPorp) => void;
    onAdd: (add: ITypeJsonFunctionPorp) => void;
    onDelete: (del: ITypeJsonFunctionPorp) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ data, onEdit, onAdd, onDelete }) => {
    return (
        <div style={{ maxHeight: '600px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            <ReactJson
                src={data}
                onEdit={onEdit}
                onAdd={onAdd}
                onDelete={onDelete}
                enableClipboard={true}
                displayDataTypes={false}
                displayObjectSize={true}
                indentWidth={4}
                collapsed={2}  // Collapse the JSON by default up to 2 levels
                style={{ fontSize: '14px' }}
            />
        </div>
    );
}

export default JsonEditor;
