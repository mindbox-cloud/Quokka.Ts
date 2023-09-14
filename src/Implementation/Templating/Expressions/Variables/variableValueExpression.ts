import {RenderContext} from "../../../Rendering/renderContext";

import {VariantValueExpression} from "./variantValueExpression";

export class VariableValueExpression implements VariantValueExpression {

    private readonly variableName: string;

    constructor(variableName: string) {
        this.variableName = variableName;
    }

    public evaluate(renderContext: RenderContext) {
        const variableValueKey = Object
            .getOwnPropertyNames(renderContext.compositeModelValue)
            .find(name => name.toLowerCase() === this.variableName.toLowerCase());

        if (variableValueKey)
            return renderContext.compositeModelValue[variableValueKey];

        throw new Error(`Value for variable "${this.variableName}" not found`);
    }

    public checkIfExpressionIsNull(renderContext: RenderContext) {
        const evaluationResult = this.evaluate(renderContext);
        return evaluationResult === null || evaluationResult === undefined;
    }
}