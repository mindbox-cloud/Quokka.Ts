import { Template } from "../quokka";

describe(
	"Rendering 'if' block null comparsion",
	() => {

		it("Check if primitive null",
		() => {
			const template = new Template(`
				@{ if A = null }
					Correct.
				@{ end if }
			`);
			
			const result = template.render({
				"A": null
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("Check if primitive null: not null",
		() => {
			const template = new Template(`
				@{ if A = null }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": 42
			});

			expect(result).toEqual(`
				
			`);
		});

		it("Check if primitive not null: not null",
		() => {
			const template = new Template(`
				@{ if A != null }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": "42"
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("Check if primitive not null: null",
		() => {
			const template = new Template(`
				@{ if A != null }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": null
			});

			expect(result).toEqual(`
				
			`);
		});

		it("Check if null: case insensitivity",
		() => {
			const template = new Template(`
				@{ if A = NuLL }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": null
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});
	}
);
