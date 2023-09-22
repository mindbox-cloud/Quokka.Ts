import {RenderContext} from "../../../Rendering/renderContext";

import {BooleanExpression} from "./booleanExpression";

export class NotExpression extends BooleanExpression {

    private readonly inner: BooleanExpression;

    constructor(inner: BooleanExpression) {
        super();
        this.inner = inner;
    }

    public getBooleanValue(renderContext: RenderContext): boolean {
        return !this.inner.getBooleanValue(renderContext);
    }

    public checkIfExpressionIsNull(renderContext: RenderContext) {
        return this.inner.checkIfExpressionIsNull(renderContext);
    }
}