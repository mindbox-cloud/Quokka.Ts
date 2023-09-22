import {BooleanExpression} from "../Expressions/Boolean/booleanExpression";
import {RenderContext} from "../../Rendering/renderContext";

import {TemplateNode} from "./templateNode";

export class ConditionBlock implements TemplateNode {

    private readonly conditionExpression: BooleanExpression;
    private readonly block: TemplateNode;

    constructor(conditionExpression: BooleanExpression, block: TemplateNode) {
        this.conditionExpression = conditionExpression;
        this.block = block;
    }

    public render(renderContext: RenderContext): string {
        return this.block?.render(renderContext) ?? "";
    }

    public shouldRender(renderContext: RenderContext): boolean {
        return this.conditionExpression.getBooleanValue(renderContext);
    }
}