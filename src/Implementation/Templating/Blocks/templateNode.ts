import {RenderContext} from "../../Rendering/renderContext";

export interface TemplateNode {
    render(renderContext: RenderContext): string;
}