import {RenderContext} from "./Rendering/renderContext";

export interface Expression {
    evaluate(renderContext: RenderContext): any;

    checkIfExpressionIsNull(renderContext: RenderContext): boolean;
}