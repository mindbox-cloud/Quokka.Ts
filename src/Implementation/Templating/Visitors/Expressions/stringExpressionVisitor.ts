import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {QuokkaVisitor} from "../../../../Generated/QuokkaVisitor";
import * as Parser from "../../../../Generated/QuokkaParser";
import {StringConstantExpression} from "../../Expressions/String/stringConstantExpression";
import {StringExpression} from "../../Expressions/String/stringExpression";

export class StringExpressionVisitor
    extends AbstractParseTreeVisitor<StringExpression>
    implements QuokkaVisitor<StringExpression> {

    protected defaultResult(): StringExpression {
        return null;
    }

    public visitStringConstant(ctx: Parser.StringConstantContext) {
        const quotedValue = ctx.DoubleQuotedString() == null
            ? ctx.SingleQuotedString()
            : ctx.DoubleQuotedString();

        const unquotedValue = quotedValue.text.substring(1, quotedValue.text.length - 1);
        return new StringConstantExpression(unquotedValue);
    }
}