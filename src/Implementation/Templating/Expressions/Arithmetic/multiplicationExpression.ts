import {ArithmeticExpression} from "./arithmeticExpression";
import {MultiplicationOperand} from "./multiplicationOperand";
import {RenderContext} from "../../../Rendering/renderContext";

export class MultiplicationExpression extends ArithmeticExpression {

    private readonly operands: MultiplicationOperand[];

    constructor(operands: MultiplicationOperand[]) {
        super();
        this.operands = operands;
    }

    getValue(renderContext: RenderContext): number {
        return this.operands.reduce((current, operand) => operand.calculate(current, renderContext), 1.0);
    }

    checkIfExpressionIsNull(renderContext: RenderContext): boolean {
        return this.operands.some(operand => operand.expression.checkIfExpressionIsNull(renderContext));
    }
}