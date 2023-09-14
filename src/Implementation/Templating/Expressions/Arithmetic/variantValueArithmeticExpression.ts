import {ArithmeticExpression} from "./arithmeticExpression";
import {RenderContext} from "../../../Rendering/renderContext";

import {VariantValueExpression} from "../Variables/variantValueExpression";

export class VariantValueArithmeticExpression extends ArithmeticExpression {

    private readonly variantValueExpression: VariantValueExpression;

    constructor(variantValueExpression: VariantValueExpression) {
        super();
        this.variantValueExpression = variantValueExpression;
    }

    getValue(renderContext: RenderContext): number {
        return +this.variantValueExpression.evaluate(renderContext);
    }

    checkIfExpressionIsNull(renderContext: RenderContext): boolean {
        return this.variantValueExpression.checkIfExpressionIsNull(renderContext);
    }
}