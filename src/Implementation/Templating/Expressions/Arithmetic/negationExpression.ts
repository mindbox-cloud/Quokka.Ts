import {ArithmeticExpression} from "./arithmeticExpression";
import {RenderContext} from "../../../Rendering/renderContext";

export class NegationExpression extends ArithmeticExpression {

    private readonly innerExpression: ArithmeticExpression;

    constructor(innerExpression: ArithmeticExpression) {
        super();
        this.innerExpression = innerExpression;
    }

    getValue(renderContext: RenderContext): number {
        return -1.0 * this.innerExpression.getValue(renderContext);
    }

    checkIfExpressionIsNull(renderContext: RenderContext): boolean {
        return this.innerExpression.checkIfExpressionIsNull(renderContext);
    }
}