import {RenderContext} from "../../../Rendering/renderContext";
import {BooleanExpression} from "./booleanExpression";
import {VariantValueExpression} from "../Variables/variantValueExpression";

export class VariantValueBooleanExpression extends BooleanExpression {

    private readonly variantValueExpression: VariantValueExpression;

    constructor(
        variantValueExpression: VariantValueExpression) {
        super();
        this.variantValueExpression = variantValueExpression;
    }

    public getBooleanValue(renderContext: RenderContext): boolean {
        const value = this.variantValueExpression.evaluate(renderContext);
        return value as boolean;
    }

    public checkIfExpressionIsNull(renderContext: RenderContext) {
        return this.variantValueExpression.checkIfExpressionIsNull(renderContext);
    }
}