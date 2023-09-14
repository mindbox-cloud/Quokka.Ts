import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {QuokkaVisitor} from "../../../../Generated/QuokkaVisitor";
import * as Parser from "../../../../Generated/QuokkaParser";
import {VariantValueExpressionVisitor} from "./variantValueExpressionVisitor";
import {StringExpressionVisitor} from "./stringExpressionVisitor";
import {Expression} from "../../../expression";

export class ExpressionVisitor extends AbstractParseTreeVisitor<Expression> implements QuokkaVisitor<Expression> {
    protected defaultResult(): Expression {
        return null;
    }

    public visitVariantValueExpression(ctx: Parser.VariantValueExpressionContext) {
        return ctx.accept(new VariantValueExpressionVisitor());
    }

    public visitStringExpression(ctx: Parser.StringExpressionContext) {
        return ctx.accept(new StringExpressionVisitor());
    }
}