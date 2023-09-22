import {RenderContext} from "../../../Rendering/renderContext";
import {ArithmeticExpression} from "./arithmeticExpression";

export abstract class AdditionOperand {

    private readonly _expression: ArithmeticExpression;

    public get expression() {
        return this._expression;
    }

    protected constructor(expression: ArithmeticExpression) {
        this._expression = expression;
    }

    public abstract calculate(leftOperand: number, renderContext: RenderContext): number;

    public static Plus(expression: ArithmeticExpression): AdditionOperand {
        return new this.PlusOperand(expression);
    }

    public static Minus(expression: ArithmeticExpression): AdditionOperand {
        return new this.MinusOperand(expression);
    }

    private static PlusOperand = class extends AdditionOperand {

        constructor(expression: ArithmeticExpression) {
            super(expression);
        }

        calculate(leftOperand: number, renderContext: RenderContext): number {
            return leftOperand + this.expression.getValue(renderContext);
        }
    }

    private static MinusOperand = class extends AdditionOperand {

        constructor(expression: ArithmeticExpression) {
            super(expression);
        }

        calculate(leftOperand: number, renderContext: RenderContext): number {
            return leftOperand - this.expression.getValue(renderContext);
        }
    }
}
