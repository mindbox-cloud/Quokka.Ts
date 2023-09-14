import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {QuokkaVisitor} from "../../../Generated/QuokkaVisitor";
import * as Parser from "../../../Generated/QuokkaParser";
import {ConditionsVisitor} from "./conditionsVisitor";
import {TemplateNode} from "../Blocks/templateNode";
import {IfBlock} from "../Blocks/ifBlock";

export class DynamicBlockVisitor
    extends AbstractParseTreeVisitor<TemplateNode>
    implements QuokkaVisitor<TemplateNode> {

    protected defaultResult(): TemplateNode {
        return null;
    }

    public visitIfStatement(ctx: Parser.IfStatementContext): TemplateNode {
        const conditionsVisitor = new ConditionsVisitor();

        let conditions = [ctx.ifCondition().accept(conditionsVisitor)];

        conditions = conditions.concat(ctx.elseIfCondition().map(x => x.accept(conditionsVisitor)));

        if (ctx.elseCondition() !== null && ctx.elseCondition() !== undefined) {
            conditions.push(ctx.elseCondition().accept(conditionsVisitor));
        }

        return new IfBlock(conditions);
    }
}