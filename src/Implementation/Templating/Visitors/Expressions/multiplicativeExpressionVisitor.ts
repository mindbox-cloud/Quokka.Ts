import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {MultiplicationOperand} from "../../Expressions/Arithmetic/multiplicationOperand";
import {QuokkaVisitor} from "../../../../Generated/QuokkaVisitor";
import * as Parser from "../../../../Generated/QuokkaParser";
import {ArithmeticExpressionVisitor} from "./arithmeticExpressionVisitor";

export class MultiplicativeExpressionVisitor
    extends AbstractParseTreeVisitor<MultiplicationOperand>
    implements QuokkaVisitor<MultiplicationOperand> {

    protected defaultResult(): MultiplicationOperand {
        return null;
    }

    public visitMultiplicationOperand(ctx: Parser.MultiplicationOperandContext): MultiplicationOperand {
        return MultiplicationOperand.Multiply(ctx.arithmeticAtom().accept(new ArithmeticExpressionVisitor()));
    }

    public visitDivisionOperand(ctx: Parser.DivisionOperandContext): MultiplicationOperand {
        return MultiplicationOperand.Divide(ctx.arithmeticAtom().accept(new ArithmeticExpressionVisitor()));
    }
}