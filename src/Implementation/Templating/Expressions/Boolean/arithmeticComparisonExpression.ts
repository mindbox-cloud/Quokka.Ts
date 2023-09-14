import {ComparisonOperation} from "../../../comparisonOperation";
import {ArithmeticExpression} from "../Arithmetic/arithmeticExpression";
import {RenderContext} from "../../../Rendering/renderContext";

import {BooleanExpression} from "./booleanExpression";

export class ArithmeticComparisonExpression extends BooleanExpression {

    private readonly operation: ComparisonOperation;
    private readonly left: ArithmeticExpression;
    private readonly right: ArithmeticExpression;

    private readonly epsilon: number = 1e-7;

    constructor(
        operation: ComparisonOperation,
        left: ArithmeticExpression,
        right: ArithmeticExpression) {
        super();
        this.operation = operation;
        this.left = left;
        this.right = right;
    }


    getBooleanValue(renderContext: RenderContext): boolean {
        const leftValue = this.left.getValue(renderContext);
        const rightValue = this.right.getValue(renderContext);

        switch (this.operation) {
            case ComparisonOperation.Equals:
                return Math.abs(leftValue - rightValue) < this.epsilon;
            case ComparisonOperation.NotEquals:
                return Math.abs(leftValue - rightValue) > this.epsilon;
            case ComparisonOperation.LessThan:
                return Math.abs(rightValue - leftValue) > this.epsilon;
            case ComparisonOperation.GreaterThan:
                return Math.abs(leftValue - rightValue) > this.epsilon;
            case ComparisonOperation.LessThanOrEquals:
                return ((rightValue - leftValue) > this.epsilon)
                    || (Math.abs(leftValue - rightValue) < this.epsilon);
            case ComparisonOperation.GreaterThanOrEquals:
                return ((leftValue - rightValue) > this.epsilon)
                    || (Math.abs(leftValue - rightValue) < this.epsilon);
            default:
                throw new Error("Unsupported comparison operation");
        }
    }

    checkIfExpressionIsNull(renderContext: RenderContext): boolean {
        return this.left.checkIfExpressionIsNull(renderContext) || this.right.checkIfExpressionIsNull(renderContext);
    }
}