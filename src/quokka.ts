import { ANTLRInputStream, CommonTokenStream } from "antlr4ts";
import { QuokkaLex } from "./Generated/QuokkaLex";
import * as Parsing from "./Generated/QuokkaParser";

import {TemplateBlockVisitor} from "./Implementation/Templating/Visitors/templateBlockVisitor";
import {TemplateBlock} from "./Implementation/Templating/Blocks/templateBlock";

export type FunctionRegistry = { [name: string]: Function };

export class Template {

	private root: TemplateBlock;
	private readonly functionRegistry: FunctionRegistry;

	public constructor(templateText: string, functionRegistry?: FunctionRegistry) {
		this.functionRegistry = functionRegistry;
		this.root = this.parseTemplate(templateText);
	}

	public render = (templateViewModel?: Object) : string => {
		return this.root.render({
			compositeModelValue: templateViewModel || {},
			functionRegistry: this.functionRegistry
		});
	}

	private parseTemplate(templateText: string) : TemplateBlock {
		const chars = new ANTLRInputStream(templateText);
		const lexer = new QuokkaLex(chars);
		const tokens = new CommonTokenStream(lexer);
		const parser = new Parsing.QuokkaParser(tokens);

		const rootContext = parser.template();
		return rootContext.accept(new TemplateBlockVisitor());
	}
}