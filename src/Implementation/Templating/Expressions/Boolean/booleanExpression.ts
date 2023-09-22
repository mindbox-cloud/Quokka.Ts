import {RenderContext} from "../../../Rendering/renderContext";

import {Expression} from "../../../expression";

export abstract class BooleanExpression implements Expression {

    public abstract getBooleanValue(renderContext: RenderContext): boolean;

    public evaluate(renderContext: RenderContext) {
        return this.getBooleanValue(renderContext);
    }

    public abstract checkIfExpressionIsNull(renderContext: RenderContext): boolean;
}