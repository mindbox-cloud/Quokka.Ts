import {RenderContext} from "../../../Rendering/renderContext";

import {BooleanExpression} from "./booleanExpression";

export class TrueExpression extends BooleanExpression {

    public getBooleanValue(_: RenderContext): boolean {
        return true;
    }

    public checkIfExpressionIsNull(_: RenderContext) {
        return false;
    }
}