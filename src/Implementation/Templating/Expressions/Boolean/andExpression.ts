import {RenderContext} from "../../../Rendering/renderContext";

import {BooleanExpression} from "./booleanExpression";

export class AndExpression extends BooleanExpression {

    private readonly subExpressions: BooleanExpression[];

    constructor(subExpressions: BooleanExpression[]) {
        super();
        this.subExpressions = subExpressions;
    }

    public getBooleanValue(renderContext: RenderContext): boolean {
        return this.subExpressions.some(x => x.getBooleanValue(renderContext) !== true) === false;
    }

    public checkIfExpressionIsNull(renderContext: RenderContext) {
        return this.subExpressions.some(expression => expression.checkIfExpressionIsNull(renderContext));
    }
}