import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {QuokkaVisitor} from "../../../Generated/QuokkaVisitor";
import * as Parser from "../../../Generated/QuokkaParser";
import {TemplateBlock} from "../Blocks/templateBlock";
import {ConstantBlock} from "../Blocks/constantBlock";
import {TemplateNodeVisitor} from "./templateNodeVisitor";

export class TemplateBlockVisitor extends AbstractParseTreeVisitor<TemplateBlock> implements QuokkaVisitor<TemplateBlock> {

    protected defaultResult(): TemplateBlock {
        throw new Error("Unsupported");
    }

    public visitTemplate(ctx: Parser.TemplateContext): TemplateBlock {
        const templateBlock = ctx.templateBlock();

        if (templateBlock) {
            return ctx.templateBlock().accept(this);
        } else {
            return new TemplateBlock([
                new ConstantBlock("")
            ]);
        }
    }

    public visitTemplateBlock(ctx: Parser.TemplateBlockContext): TemplateBlock {
        const templateVisitor = new TemplateNodeVisitor();
        return new TemplateBlock(
            ctx.children
                .map(child => child.accept(templateVisitor))
                .filter(child => child !== null && child !== undefined));
    }
}

