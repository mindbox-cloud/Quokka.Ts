import {RenderContext} from "../../../Rendering/renderContext";
import {VariantValueExpression} from "../Variables/variantValueExpression";
import {Expression} from "../../../expression";

export class FunctionCallExpression implements VariantValueExpression {

    private functionName: string;
    private functionArguments: Expression[];

    constructor(functionName: string, functionArguments: Expression[]) {
        this.functionName = functionName;
        this.functionArguments = functionArguments;
    }

    public evaluate(renderContext: RenderContext) {

        const templateFunctionKey = Object
            .getOwnPropertyNames(renderContext.functionRegistry)
            .find(name => name.toLowerCase() === this.functionName.toLowerCase());

        if (templateFunctionKey) {
            return renderContext.functionRegistry[templateFunctionKey]
                .apply(
                    null,
                    this.functionArguments.map(arg => arg.evaluate(renderContext)));
        }

        throw new Error(`Function ${this.functionName} not found`);
    }

    public checkIfExpressionIsNull(renderContext: RenderContext) {
        const evaluationResult = this.evaluate(renderContext);
        return evaluationResult === null || evaluationResult === undefined;
    }
}