import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {QuokkaVisitor} from "../../../../Generated/QuokkaVisitor";
import * as Parser from "../../../../Generated/QuokkaParser";
import {ComparisonOperation} from "../../../comparisonOperation";
import {ArithmeticExpressionVisitor} from "./arithmeticExpressionVisitor";
import {VariantValueExpressionVisitor} from "./variantValueExpressionVisitor";
import {StringExpressionVisitor} from "./stringExpressionVisitor";
import {AndExpression} from "../../Expressions/Boolean/andExpression";
import {NotExpression} from "../../Expressions/Boolean/notExpression";
import {StringComparisonExpression} from "../../Expressions/Boolean/stringComparisonExpression";
import {NullComparisonExpression} from "../../Expressions/Boolean/nullComparisonExpression";
import {VariantValueBooleanExpression} from "../../Expressions/Boolean/variantValueBooleanExpression";
import {ArithmeticComparisonExpression} from "../../Expressions/Boolean/arithmeticComparisonExpression";
import {OrExpression} from "../../Expressions/Boolean/orExpression";
import {BooleanExpression} from "../../Expressions/Boolean/booleanExpression";

export class BooleanExpressionVisitor
    extends AbstractParseTreeVisitor<BooleanExpression>
    implements QuokkaVisitor<BooleanExpression> {

    protected defaultResult(): BooleanExpression {
        return null;
    }

    public visitParenthesizedBooleanExpression(ctx: Parser.ParenthesizedBooleanExpressionContext): BooleanExpression {
        return ctx.booleanExpression().accept(this);
    }

    public visitBooleanExpression(ctx: Parser.BooleanExpressionContext): BooleanExpression {
        const expressions = ctx.andExpression().map(x => x.accept(this));
        return expressions.length > 1
            ? new OrExpression(expressions)
            : expressions[0];
    }

    public visitAndExpression(ctx: Parser.AndExpressionContext): BooleanExpression {
        const expressions = ctx.booleanAtom().map(x => x.accept(this));
        return expressions.length > 1
            ? new AndExpression(expressions)
            : expressions[0];
    }

    public visitNotExpression(ctx: Parser.NotExpressionContext): BooleanExpression {
        return new NotExpression(ctx.booleanAtom().accept(this));
    }

    public visitStringComparisonExpression(ctx: Parser.StringComparisonExpressionContext): BooleanExpression {
        let operation: ComparisonOperation;

        if (ctx.Equals() !== null && ctx.Equals() !== undefined) {
            operation = ComparisonOperation.Equals;
        } else if (ctx.NotEquals() !== null && ctx.NotEquals() !== undefined) {
            operation = ComparisonOperation.NotEquals;
        } else {
            throw new Error("None of possible comparison operators encountered, the grammar is most likely faulty");
        }

        return new StringComparisonExpression(
            ctx.variantValueExpression().accept(new VariantValueExpressionVisitor()),
            ctx.stringExpression().accept(new StringExpressionVisitor()),
            operation
        );
    }

    public visitNullComparisonExpression(ctx: Parser.NullComparisonExpressionContext): BooleanExpression {
        let operation: ComparisonOperation;

        if (ctx.Equals() !== null && ctx.Equals() !== undefined) {
            operation = ComparisonOperation.Equals;
        } else if (ctx.NotEquals() !== null && ctx.NotEquals() !== undefined) {
            operation = ComparisonOperation.NotEquals;
        } else {
            throw new Error("None of possible comparison operators encountered, the grammar is most likely faulty");
        }

        return new NullComparisonExpression(
            ctx.variantValueExpression().accept(new VariantValueExpressionVisitor()),
            operation
        );
    }

    public visitArithmeticComparisonExpression(ctx: Parser.ArithmeticComparisonExpressionContext): BooleanExpression {
        let operation: ComparisonOperation;

        if (ctx.Equals() !== null && ctx.Equals() !== undefined) {
            operation = ComparisonOperation.Equals;
        } else if (ctx.NotEquals() !== null && ctx.NotEquals() !== undefined) {
            operation = ComparisonOperation.NotEquals;
        } else if (ctx.LessThan() !== null && ctx.LessThan() !== undefined) {
            operation = ComparisonOperation.LessThan;
        } else if (ctx.GreaterThan() !== null && ctx.GreaterThan() !== undefined) {
            operation = ComparisonOperation.GreaterThan;
        } else if (ctx.LessThanOrEquals() !== null && ctx.LessThanOrEquals() !== undefined) {
            operation = ComparisonOperation.LessThanOrEquals;
        } else if (ctx.GreaterThanOrEquals() !== null && ctx.GreaterThanOrEquals() !== undefined) {
            operation = ComparisonOperation.GreaterThanOrEquals;
        } else {
            throw new Error("None of possible comparison operators encountered, the grammar is most likely faulty");
        }

        const arithmeticVisitor = new ArithmeticExpressionVisitor();
        return new ArithmeticComparisonExpression(
            operation,
            ctx.arithmeticExpression(0).accept(arithmeticVisitor),
            ctx.arithmeticExpression(1).accept(arithmeticVisitor));
    }

    public visitVariantValueExpression(ctx: Parser.VariantValueExpressionContext): BooleanExpression {
        return new VariantValueBooleanExpression(ctx.accept(new VariantValueExpressionVisitor()));
    }
}