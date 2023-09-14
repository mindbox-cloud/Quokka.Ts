import {ArithmeticExpression} from "./arithmeticExpression";
import {RenderContext} from "../../../Rendering/renderContext";

export class NumberExpression extends ArithmeticExpression {

    private readonly number: number;

    constructor(number: number) {
        super();
        this.number = number;
    }

    getValue(_: RenderContext): number {
        return this.number;
    }

    checkIfExpressionIsNull(renderContext: RenderContext): boolean {
        return false;
    }
}