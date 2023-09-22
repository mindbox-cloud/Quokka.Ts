import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {AdditionOperand} from "../../Expressions/Arithmetic/additionOperand";
import {QuokkaVisitor} from "../../../../Generated/QuokkaVisitor";
import * as Parser from "../../../../Generated/QuokkaParser";

import {ArithmeticExpressionVisitor} from "./arithmeticExpressionVisitor";

export class AdditionalExpressionVisitor
    extends AbstractParseTreeVisitor<AdditionOperand>
    implements QuokkaVisitor<AdditionOperand> {

    protected defaultResult(): AdditionOperand {
        return null;
    }

    public visitPlusOperand(ctx: Parser.PlusOperandContext): AdditionOperand {
        return AdditionOperand.Plus(ctx.multiplicationExpression().accept(new ArithmeticExpressionVisitor()));
    }

    public visitMinusOperand(ctx: Parser.MinusOperandContext): AdditionOperand {
        return AdditionOperand.Minus(ctx.multiplicationExpression().accept(new ArithmeticExpressionVisitor()));
    }
}
