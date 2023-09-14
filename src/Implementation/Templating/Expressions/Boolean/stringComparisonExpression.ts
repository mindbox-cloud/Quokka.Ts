import {ComparisonOperation} from "../../../comparisonOperation";
import {RenderContext} from "../../../Rendering/renderContext";
import {BooleanExpression} from "./booleanExpression";
import {StringExpression} from "../String/stringExpression";
import {VariantValueExpression} from "../Variables/variantValueExpression";

export class StringComparisonExpression extends BooleanExpression {

    private readonly variantValueExpression: VariantValueExpression;
    private readonly stringExpression: StringExpression;
    private readonly comparisonOperation: ComparisonOperation;

    constructor(
        variantValueExpression: VariantValueExpression,
        stringExpression: StringExpression,
        comparisonOperation: ComparisonOperation) {
        super();
        this.variantValueExpression = variantValueExpression;
        this.stringExpression = stringExpression;
        this.comparisonOperation = comparisonOperation;
    }

    public getBooleanValue(renderContext: RenderContext): boolean {
        const variableValue = this.variantValueExpression.evaluate(renderContext).toString();
        const stringValue = this.stringExpression.evaluate(renderContext).toString();

        const areStringsEqual: boolean = variableValue.toLowerCase() === stringValue.toLowerCase();

        switch (this.comparisonOperation) {
            case ComparisonOperation.Equals:
                return areStringsEqual;
            case ComparisonOperation.NotEquals:
                return !areStringsEqual;
            default:
                throw new Error("Unsupported comparison operation");
        }
    }

    public checkIfExpressionIsNull(renderContext: RenderContext) {
        return this.variantValueExpression.checkIfExpressionIsNull(renderContext)
            || this.stringExpression.checkIfExpressionIsNull(renderContext);
    }
}