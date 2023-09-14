import {RenderContext} from "../../../Rendering/renderContext";

import {Expression} from "../../../expression";

export abstract class ArithmeticExpression implements Expression {

    public abstract getValue(renderContext: RenderContext): number;

    public abstract checkIfExpressionIsNull(renderContext: RenderContext): boolean;

    public evaluate(renderContext: RenderContext): any {
        const value = this.getValue(renderContext);
        return this.normalizeNumber(value);
    }

    private normalizeNumber(value: number): number {
        try {
            const epsilon = 1e-8;

            const intValue = Math.ceil(value);

            if (Math.abs(value - intValue) < epsilon)
                return intValue;
            else
                return value;
        } catch {
            throw new Error("Arithmetic operation result could not be evaluated");
        }
    }
}