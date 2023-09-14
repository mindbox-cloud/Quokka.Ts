import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {VariableValueExpression} from "../../Expressions/Variables/variableValueExpression";
import {QuokkaVisitor} from "../../../../Generated/QuokkaVisitor";
import * as Parser from "../../../../Generated/QuokkaParser";

export class VariableValueExpressionVisitor
    extends AbstractParseTreeVisitor<VariableValueExpression>
    implements QuokkaVisitor<VariableValueExpression> {

    protected defaultResult(): VariableValueExpression {
        return null;
    }

    public visitVariableValueExpression(ctx: Parser.VariableValueExpressionContext): VariableValueExpression {
        return new VariableValueExpression(ctx.Identifier().text);
    }
}