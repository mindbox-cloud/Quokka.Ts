import {ArithmeticExpression} from "./arithmeticExpression";
import {AdditionOperand} from "./additionOperand";
import {RenderContext} from "../../../Rendering/renderContext";

export class AdditionExpression extends ArithmeticExpression {

    private readonly operands: AdditionOperand[];

    constructor(operands: AdditionOperand[]) {
        super();
        this.operands = operands;
    }

    getValue(renderContext: RenderContext): number {
        return this.operands.reduce((current, operand) => operand.calculate(current, renderContext), 0.0);
    }

    checkIfExpressionIsNull(renderContext: RenderContext): boolean {
        return this.operands.some(operand => operand.expression.checkIfExpressionIsNull(renderContext));
    }
}
