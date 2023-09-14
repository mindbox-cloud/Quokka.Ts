import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {QuokkaVisitor} from "../../../../Generated/QuokkaVisitor";
import * as Parser from "../../../../Generated/QuokkaParser";
import {AdditionOperand} from "../../Expressions/Arithmetic/additionOperand";
import {AdditionalExpressionVisitor} from "./additionalExpressionVisitor";

import {VariantValueExpressionVisitor} from "./variantValueExpressionVisitor";
import {ArithmeticExpression} from "../../Expressions/Arithmetic/arithmeticExpression";
import {AdditionExpression} from "../../Expressions/Arithmetic/additionExpression";
import {NegationExpression} from "../../Expressions/Arithmetic/negationExpression";
import {NumberExpression} from "../../Expressions/Arithmetic/numberExpression";
import {VariantValueArithmeticExpression} from "../../Expressions/Arithmetic/variantValueArithmeticExpression";
import {MultiplicationOperand} from "../../Expressions/Arithmetic/multiplicationOperand";
import {MultiplicativeExpressionVisitor} from "./multiplicativeExpressionVisitor";
import {MultiplicationExpression} from "../../Expressions/Arithmetic/multiplicationExpression";

export class ArithmeticExpressionVisitor
    extends AbstractParseTreeVisitor<ArithmeticExpression>
    implements QuokkaVisitor<ArithmeticExpression> {

    protected defaultResult(): ArithmeticExpression {
        return null;
    }

    public visitArithmeticExpression(ctx: Parser.ArithmeticExpressionContext): ArithmeticExpression {
        if (!(ctx.minusOperand()?.length > 0) && !(ctx.plusOperand()?.length > 0)) {
            return ctx.multiplicationExpression().accept(this);
        }

        let operands = [AdditionOperand.Plus(ctx.multiplicationExpression().accept(this))];

        operands = operands.concat(ctx.children
            .filter((_, i) => i >= 1)
            .map(x => x.accept(new AdditionalExpressionVisitor())));

        return new AdditionExpression(operands);
    }

    public visitMultiplicationExpression(ctx: Parser.MultiplicationExpressionContext): ArithmeticExpression {
        if (!(ctx.multiplicationOperand()?.length > 0) && !(ctx.divisionOperand()?.length > 0)) {
            return ctx.arithmeticAtom().accept(this);
        }

        let operands = [MultiplicationOperand.Multiply(ctx.arithmeticAtom().accept(this))];

        operands = operands.concat(ctx.children
            .filter((_, i) => i >= 1)
            .map(x => x.accept(new MultiplicativeExpressionVisitor())));

        return new MultiplicationExpression(operands);
    }

    public visitNegationExpression(ctx: Parser.NegationExpressionContext): ArithmeticExpression {
        return new NegationExpression(ctx.arithmeticAtom().accept(this));
    }

    public visitArithmeticAtom(ctx: Parser.ArithmeticAtomContext): ArithmeticExpression {
        const number = ctx.Number();
        if (number !== null && number !== undefined) {
            return new NumberExpression(+number.text);
        }

        return (this as QuokkaVisitor<ArithmeticExpression>).visitArithmeticAtom(ctx);
    }

    public visitVariantValueExpression(ctx: Parser.VariantValueExpressionContext): ArithmeticExpression {
        return new VariantValueArithmeticExpression(ctx.accept(new VariantValueExpressionVisitor()));
    }
}