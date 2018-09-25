import { INode } from './node.interface';
import { ProcedureTypes, IFunction, IProcedure } from '@models/procedure';
import { PortType, InputType, OutputType } from '@models/port';

export abstract class NodeUtils{

    static getNewNode(): INode{
        let node: INode = <INode>{
            name: "a_new_node", 
            position: {x: 0, y: 0}, 
            procedure: [],
            state: {
                procedure: undefined, 
                input_port: undefined, 
                output_port: undefined
            },
            inputs: [
                {
                    name: 'first_input', 
                    default: 0,
                    value: undefined,
                    isConnected: false,
                    type: PortType.Input,
                    meta: {
                        mode: InputType.SimpleInput, 
                        opts: undefined
                    }
                }
            ],
            outputs: [
                {
                    name: 'first_output', 
                    isConnected: false,
                    type: PortType.Output,
                    meta: {
                        mode: OutputType.Text, 
                    }
                }
            ]
        }
        return node;
    };

    static select_procedure(node: INode, procedure: IProcedure){

        if(node.state.procedure === procedure){
            node.state.procedure = undefined;
            procedure.selected = false;
        }else{
            if(node.state.procedure){
                node.state.procedure.selected = false;
            }

            node.state.procedure = procedure;
            procedure.selected = true;
        }

    }
    
    static add_procedure(node: INode, type: ProcedureTypes, data: IFunction ){
        let prod: IProcedure = <IProcedure>{};
        prod.type= type;
        
        // TODO: Procedure should be added below the selected procedure
        // If no procedure is selected, add it to root: node.procedure
        // If a procedure is selected, 
        //          check is procedure.children is defined - if defined, add the procedure to the children array of the selected procedure
        //          if not defined - add the procedure to the children array of the parent of the selected procedure, below the selected procedure
        node.procedure.push(prod);

        // TODO: Add appropriate parent to the procedure. If added to root, leave undefined;

        // select the procedure
        NodeUtils.select_procedure(node, prod);

        switch(prod.type){

            case ProcedureTypes.VARIABLE:
                prod.argCount = 2;
                prod.args = [ {name: 'var_name', value: undefined, default: undefined}, {name: 'value', value: undefined, default: undefined} ];
                break;
            
            case ProcedureTypes.FOREACH:
                prod.argCount = 2; 
                prod.args = [ {name: 'i', value: undefined, default: undefined}, {name: 'arr', value: undefined, default: []} ];
                prod.children = [];
                break;

            case ProcedureTypes.WHILE:
                prod.argCount = 1; 
                prod.args = [ {name: 'conditional_statement', value: undefined, default: undefined} ];
                break;

            case ProcedureTypes.IF: 
            case ProcedureTypes.ELSEIF:
                prod.argCount = 1;
                prod.args = [ {name: 'conditional_statement', value: undefined, default: undefined} ];
                prod.children = [];
                break;

            case ProcedureTypes.ELSE:
                prod.argCount = 0;
                prod.args = [];
                prod.children = [];
                break;

            case ProcedureTypes.BREAK:
            case ProcedureTypes.CONTINUE:
                prod.argCount = 0;
                prod.args = [];

            case ProcedureTypes.FUNCTION:
                if(type == ProcedureTypes.FUNCTION){
                    if(!data) throw Error('No function data');
                    
                    prod.meta = { module: data.module, name: data.name };
                    prod.argCount = data.argCount + 1;
                    prod.args = [ {name: 'var_name', value: 'result', default: undefined}, ...data.args];
                }

        }
        
    }

}