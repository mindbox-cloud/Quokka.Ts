import {ArithmeticExpression} from "./arithmeticExpression";
import {RenderContext} from "../../../Rendering/renderContext";

export abstract class MultiplicationOperand {

    private readonly _expression: ArithmeticExpression;

    public get expression() {
        return this._expression;
    }

    protected constructor(expression: ArithmeticExpression) {
        this._expression = expression;
    }

    public abstract calculate(leftOperand: number, renderContext: RenderContext): number;

    public static Multiply(expression: ArithmeticExpression): MultiplicationOperand {
        return new this.MultOperand(expression);
    }

    public static Divide(expression: ArithmeticExpression): MultiplicationOperand {
        return new this.DivOperand(expression);
    }

    private static MultOperand = class extends MultiplicationOperand {

        constructor(expression: ArithmeticExpression) {
            super(expression);
        }

        calculate(leftOperand: number, renderContext: RenderContext): number {
            return leftOperand * this.expression.getValue(renderContext);
        }
    }

    private static DivOperand = class extends MultiplicationOperand {

        constructor(expression: ArithmeticExpression) {
            super(expression);
        }

        calculate(leftOperand: number, renderContext: RenderContext): number {
            return leftOperand / this.expression.getValue(renderContext);
        }
    }
}