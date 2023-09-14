import {TemplateNode} from "./templateNode";
import {ConditionBlock} from "./conditionBlock";
import {RenderContext} from "../../Rendering/renderContext";

export class IfBlock implements TemplateNode {

    private readonly conditions: ConditionBlock[];

    constructor(conditions: ConditionBlock[]) {
        this.conditions = conditions;
    }

    public render(renderContext: RenderContext) {
        let result = "";

        for (const condition of this.conditions) {
            if (condition.shouldRender(renderContext)) {
                result += condition.render(renderContext);
                break;
            }
        }

        return result;
    }
}