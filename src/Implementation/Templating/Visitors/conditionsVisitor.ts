import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {QuokkaVisitor} from "../../../Generated/QuokkaVisitor";
import * as Parser from "../../../Generated/QuokkaParser";
import {BooleanExpressionVisitor} from "./Expressions/booleanExpressionVisitor";

import {TemplateBlockVisitor} from "./templateBlockVisitor";
import {TrueExpression} from "../Expressions/Boolean/trueExpression";
import {ConditionBlock} from "../Blocks/conditionBlock";

export class ConditionsVisitor
    extends AbstractParseTreeVisitor<ConditionBlock>
    implements QuokkaVisitor<ConditionBlock> {

    protected defaultResult(): ConditionBlock {
        return null;
    }

    public visitIfCondition(ctx: Parser.IfConditionContext): ConditionBlock {
        return new ConditionBlock(
            ctx.ifInstruction().booleanExpression().accept(new BooleanExpressionVisitor()),
            ctx.templateBlock()?.accept(new TemplateBlockVisitor())
        )
    }

    public visitElseIfCondition(ctx: Parser.ElseIfConditionContext): ConditionBlock {
        return new ConditionBlock(
            ctx.elseIfInstruction().booleanExpression().accept(new BooleanExpressionVisitor()),
            ctx.templateBlock()?.accept(new TemplateBlockVisitor())
        )
    }

    public visitElseCondition(ctx: Parser.ElseConditionContext): ConditionBlock {
        return new ConditionBlock(
            new TrueExpression(),
            ctx.templateBlock()?.accept(new TemplateBlockVisitor())
        )
    }
}