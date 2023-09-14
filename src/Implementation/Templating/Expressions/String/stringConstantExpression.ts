import {RenderContext} from "../../../Rendering/renderContext";

import {StringExpression} from "./stringExpression";

export class StringConstantExpression implements StringExpression {

    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    public evaluate(renderContext: RenderContext) {
        return this.text;
    }

    public checkIfExpressionIsNull(_: RenderContext) {
        return false;
    }
}