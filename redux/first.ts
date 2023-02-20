import { FisrtState, SetExampleStringAction , SET_EXAMPLE_STRING } from "./type/fisrt.type";

export const firstState: FisrtState = {
    exampleStringState: "Hello Redux"
}

export const setExampleString = (text: string): SetExampleStringAction => {
    return {
        type: SET_EXAMPLE_STRING,
        exampleStringState: text
    }
}

export const firstReducer = (state = firstState, action: SetExampleStringAction): FisrtState => {
    switch(action.type) {
        case SET_EXAMPLE_STRING:
            return {...state, exampleStringState: action.exampleStringState};
        default:
            return state;
    }
}