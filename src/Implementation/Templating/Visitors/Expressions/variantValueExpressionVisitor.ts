import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {QuokkaVisitor} from "../../../../Generated/QuokkaVisitor";
import * as Parser from "../../../../Generated/QuokkaParser";

import {ExpressionVisitor} from "./expressionVisitor";
import {FunctionCallExpression} from "../../Expressions/Functions/functionCallExpression";
import {VariantValueExpression} from "../../Expressions/Variables/variantValueExpression";
import {VariableValueExpressionVisitor} from "./variableValueExpressionVisitor";

export class VariantValueExpressionVisitor
    extends AbstractParseTreeVisitor<VariantValueExpression>
    implements QuokkaVisitor<VariantValueExpression> {

    protected defaultResult(): VariantValueExpression {
        return null;
    }

    public visitVariableValueExpression(ctx: Parser.VariableValueExpressionContext) {
        return ctx.accept(new VariableValueExpressionVisitor());
    }

    public visitFunctionCallExpression(ctx: Parser.FunctionCallExpressionContext) {
        const expressionVisitor = new ExpressionVisitor();
        return new FunctionCallExpression(
            ctx.Identifier().text,
            ctx.argumentList().expression().map(expressionNode => expressionNode.accept(expressionVisitor)));
    }
}

