import {RenderContext} from "../../../Rendering/renderContext";

import {BooleanExpression} from "./booleanExpression";

export class OrExpression extends BooleanExpression {

    private readonly subExpressions: BooleanExpression[];

    constructor(subExpressions: BooleanExpression[]) {
        super();
        this.subExpressions = subExpressions;
    }

    public getBooleanValue(renderContext: RenderContext): boolean {
        return this.subExpressions.some(x => x.getBooleanValue(renderContext) === true);
    }

    public checkIfExpressionIsNull(renderContext: RenderContext) {
        return this.subExpressions.some(expression => expression.checkIfExpressionIsNull(renderContext));
    }
}