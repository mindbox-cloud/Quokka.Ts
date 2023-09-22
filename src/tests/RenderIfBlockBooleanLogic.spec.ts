import { Template } from "../quokka";

describe(
	"Rendering 'if' block boolean logic",
	() => {

		it("true and true",
		() => {
			const template = new Template(`
				@{ if A and B }
					Correct.
				@{ end if }
			`);
			
			const result = template.render({
				"A": true,
				"B": true
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("true and false",
		() => {
			const template = new Template(`
				@{ if A and B }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": true,
				"B": false
			});

			expect(result).toEqual(`
				
			`);
		});

		it("false and true",
		() => {
			const template = new Template(`
				@{ if A and B }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": false,
				"B": true
			});

			expect(result).toEqual(`
				
			`);
		});

		it("false and false",
		() => {
			const template = new Template(`
				@{ if A and B }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": false,
				"B": false
			});

			expect(result).toEqual(`
				
			`);
		});

		it("true or true",
		() => {
			const template = new Template(`
				@{ if A or B }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": true,
				"B": true
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("true or false",
		() => {
			const template = new Template(`
				@{ if A or B }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": true,
				"B": false
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("false or true",
		() => {
			const template = new Template(`
				@{ if A or B }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": false,
				"B": true
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("false or false",
		() => {
			const template = new Template(`
				@{ if A or B }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": false,
				"B": false
			});

			expect(result).toEqual(`
				
			`);
		});

		it("true and true and true",
		() => {
			const template = new Template(`
				@{ if A and B and C }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": true,
				"B": true,
				"C": true
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("false or false or true",
		() => {
			const template = new Template(`
				@{ if A or B or C }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": false,
				"B": false,
				"C": true
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("true and true and true and false",
		() => {
			const template = new Template(`
				@{ if A and B and C and D }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": true,
				"B": true,
				"C": true,
				"D": false
			});

			expect(result).toEqual(`
				
			`);
		});

		it("not true",
		() => {
			const template = new Template(`
				@{ if not A }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": true
			});

			expect(result).toEqual(`
				
			`);
		});

		it("not false",
		() => {
			const template = new Template(`
				@{ if not A }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": false
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("false or true and false",
		() => {
			const template = new Template(`
				@{ if A or B and C }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": false,
				"B": true,
				"C": false
			});

			expect(result).toEqual(`
				
			`);
		});

		it("false and true or false",
		() => {
			const template = new Template(`
				@{ if A and B or C }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": false,
				"B": true,
				"C": false
			});

			expect(result).toEqual(`
				
			`);
		});

		it("false or not true",
		() => {
			const template = new Template(`
				@{ if A or not B }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": false,
				"B": true
			});

			expect(result).toEqual(`
				
			`);
		});

		it("false or not false",
		() => {
			const template = new Template(`
				@{ if A or not B }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": false,
				"B": false
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("true and not true",
		() => {
			const template = new Template(`
				@{ if A and not B }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": true,
				"B": true
			});

			expect(result).toEqual(`
				
			`);
		});

		it("not false and true",
		() => {
			const template = new Template(`
				@{ if not A and B }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": false,
				"B": true
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("true and false or true parentheses",
		() => {
			const template = new Template(`
				@{ if A and (B or C) }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": true,
				"B": false,
				"C": true,
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});

		it("not true or false parentheses",
		() => {
			const template = new Template(`
				@{ if not (A or B) }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"A": true,
				"B": false
			});

			expect(result).toEqual(`
				
			`);
		});

		it("complex expression",
		() => {
			const template = new Template(`
				@{ if Magic or A or B and C or (D or E) or not(F) and (G or (H and K)) and (((bingo))) }
					Correct.
				@{ end if }
			`);

			const result = template.render({
				"Magic": false,
				"A": false,
				"B": false,
				"C": false,
				"D": false,
				"E": false,
				"F": false,
				"G": true,
				"H": true,
				"K": false,
				"bingo": true
			});

			expect(result).toEqual(`
				
					Correct.
				
			`);
		});
	}
);
