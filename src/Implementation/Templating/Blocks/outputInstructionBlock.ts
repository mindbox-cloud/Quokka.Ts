import {TemplateNode} from "./templateNode";
import {Expression} from "../../expression";
import {RenderContext} from "../../Rendering/renderContext";

export class OutputInstructionBlock implements TemplateNode {

    private expression: Expression;

    constructor(expression: Expression) {
        this.expression = expression;
    }

    public render(renderContext: RenderContext) {
        return this.expression.evaluate(renderContext);
    }
}