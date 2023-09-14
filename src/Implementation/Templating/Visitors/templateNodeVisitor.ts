import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {TemplateNode} from "../Blocks/templateNode";
import {QuokkaVisitor} from "../../../Generated/QuokkaVisitor";
import * as Parser from "../../../Generated/QuokkaParser";
import {StaticBlockVisitor} from "./staticBlockVisitor";
import {DynamicBlockVisitor} from "./dynamicBlockVisitor";
import {TemplateBlockVisitor} from "./templateBlockVisitor";

export class TemplateNodeVisitor extends AbstractParseTreeVisitor<TemplateNode> implements QuokkaVisitor<TemplateNode> {
    protected defaultResult(): TemplateNode {
        return null;
    }

    public visitTemplateBlock(ctx: Parser.TemplateBlockContext): TemplateNode {
        return ctx.accept(new TemplateBlockVisitor());
    }

    public visitStaticBlock(ctx: Parser.StaticBlockContext): TemplateNode {
        return ctx.accept(new StaticBlockVisitor());
    }

    public visitDynamicBlock(ctx: Parser.DynamicBlockContext): TemplateNode {
        return ctx.accept(new DynamicBlockVisitor());
    }
}