import { Template } from "../quokka";

describe(
	"Rendering 'if' block string comparsion",
	() => {

		it("Case sensitive equal",
		() => {
			const template = new Template(`
				@{ if A = "Margaret" }
					Correct.
				@{ end if }
			`);
			
			const result = template.render({
				"A": "Margaret"
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("Case insensitive equal",
		() => {
			const template = new Template(`
				@{ if A = "mArGaReT" }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": "Margaret"
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("Not equal",
		() => {
			const template = new Template(`
				@{ if A = "Margaret" }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": "Beatrice"
			});

			expect(result).toEqual(`
				
			`);
		});
	}
);
