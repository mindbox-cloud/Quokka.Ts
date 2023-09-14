import {TemplateNode} from "./templateNode";
import {RenderContext} from "../../Rendering/renderContext";

export class ConstantBlock implements TemplateNode {

    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    public render(renderContext: RenderContext) {
        return this.text;
    }
}