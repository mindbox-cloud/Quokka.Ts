import {ComparisonOperation} from "../../../comparisonOperation";
import {RenderContext} from "../../../Rendering/renderContext";
import {BooleanExpression} from "./booleanExpression";
import {VariantValueExpression} from "../Variables/variantValueExpression";

export class NullComparisonExpression extends BooleanExpression {

    private readonly variantValueExpression: VariantValueExpression;
    private readonly comparisonOperation: ComparisonOperation;

    constructor(
        variantValueExpression: VariantValueExpression,
        comparisonOperation: ComparisonOperation) {
        super();
        this.variantValueExpression = variantValueExpression;
        this.comparisonOperation = comparisonOperation;
    }

    public getBooleanValue(renderContext: RenderContext): boolean {
        const isValueNull: boolean = this.variantValueExpression.checkIfExpressionIsNull(renderContext);

        switch (this.comparisonOperation) {
            case ComparisonOperation.Equals:
                return isValueNull;
            case ComparisonOperation.NotEquals:
                return !isValueNull;
            default:
                throw new Error("Unsupported comparison operation");
        }
    }

    public checkIfExpressionIsNull(_: RenderContext) {
        return false;
    }
}