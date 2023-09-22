import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {QuokkaVisitor} from "../../../Generated/QuokkaVisitor";
import * as Parser from "../../../Generated/QuokkaParser";
import {ExpressionVisitor} from "./Expressions/expressionVisitor";
import {TemplateNode} from "../Blocks/templateNode";
import {TemplateBlock} from "../Blocks/templateBlock";
import {StaticBlock} from "../Blocks/staticBlock";
import {ConstantBlock} from "../Blocks/constantBlock";
import {OutputInstructionBlock} from "../Blocks/outputInstructionBlock";

export class StaticBlockVisitor extends AbstractParseTreeVisitor<TemplateNode> implements QuokkaVisitor<TemplateNode> {

    protected defaultResult(): TemplateBlock {
        throw new Error("Unsupported");
    }

    public visitStaticBlock(ctx: Parser.StaticBlockContext): TemplateNode {
        return new StaticBlock(
            ctx.children.map(child => child.accept(this)));
    }

    public visitConstantBlock(ctx: Parser.ConstantBlockContext): TemplateNode {
        return new ConstantBlock(ctx.text);
    }

    public visitOutputBlock(ctx: Parser.OutputBlockContext): TemplateNode {
        return new OutputInstructionBlock(
            ctx.expression().accept(new ExpressionVisitor()));
    }
}