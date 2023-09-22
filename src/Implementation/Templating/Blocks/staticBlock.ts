import {TemplateNode} from "./templateNode";
import {RenderContext} from "../../Rendering/renderContext";

export class StaticBlock implements TemplateNode {

    private readonly children: TemplateNode[];

    constructor(children: TemplateNode[]) {
        this.children = children;
    }

    public render(renderContext: RenderContext) {
        let result = "";

        for (const child of this.children) {
            result += child.render(renderContext);
        }

        return result;
    }
}