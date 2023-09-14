import { Template } from "../quokka";

describe(
	"Rendering 'if' block arithmetic logic",
	() => {

		it("More than is true",
		() => {
			const template = new Template(`
				@{ if A > 5 }
					It's a test
				@{ end if }
			`);
			
			const result = template.render({
				"A": 6
			});

			expect(result).toEqual(`
				
					It's a test
				
			`);
		});

		it("More than is false (less)",
		() => {
			const template = new Template(`
				@{ if A > 5 }
					It's a test
				@{ end if }
			`);

			const result = template.render({
				"A": 4
			});

			expect(result).toEqual(`
				
			`);
		});

		it("More than is false (equals)",
		() => {
			const template = new Template(`
				@{ if A > 5 }
					It's a test
				@{ end if }
			`);

			const result = template.render({
				"A": 5
			});

			expect(result).toEqual(`
				
			`);
		});

		it("Less than is true",
		() => {
			const template = new Template(`
				@{ if A < 23 }
					It's a test
				@{ end if }
			`);

			const result = template.render({
				"A": 22
			});

			expect(result).toEqual(`
				
					It's a test
				
			`);
		});

		it("Less than is false (more)",
		() => {
			const template = new Template(`
				@{ if A < 23 }
					It's a test
				@{ end if }
			`);

			const result = template.render({
				"A": 24
			});

			expect(result).toEqual(`
				
			`);
		});

		it("Less than is false (equals)",
		() => {
			const template = new Template(`
				@{ if A < 23 }
					It's a test
				@{ end if }
			`);

			const result = template.render({
				"A": 23
			});

			expect(result).toEqual(`
				
			`);
		});

		it("Equals is true",
		() => {
			const template = new Template(`
				@{ if A = 2323 }
					It's a test
				@{ end if }
			`);

			const result = template.render({
				"A": 2323
			});

			expect(result).toEqual(`
				
					It's a test
				
			`);
		});

		it("Equals is false (less)",
		() => {
			const template = new Template(`
				@{ if A = 2323 }
					It's a test
				@{ end if }
			`);

			const result = template.render({
				"A": 2322
			});

			expect(result).toEqual(`
				
			`);
		});

		it("Equals is false (more)",
		() => {
			const template = new Template(`
				@{ if A = 2323 }
					It's a test
				@{ end if }
			`);

			const result = template.render({
				"A": 2324
			});

			expect(result).toEqual(`
				
			`);
		});

		it("Equals is true (precision)",
		() => {
			const template = new Template(`
				@{ if (3 / 7) = (9000000 / 21000001) }
					It's a test
				@{ end if }
			`);

			const result = template.render({});

			expect(result).toEqual(`
				
					It's a test
				
			`);
		});

		it("Not equals is false (equals)",
		() => {
				const template = new Template(`
					@{ if A != 90 }
						It's a test
					@{ end if }
				`);

				const result = template.render({
					"A": 90
				});

				expect(result).toEqual(`
					
				`);
		});

		it("Not equals is true (more)",
		() => {
				const template = new Template(`
					@{ if A != 90 }
						It's a test
					@{ end if }
				`);

				const result = template.render({
					"A": 2324
				});

				expect(result).toEqual(`
					
						It's a test
					
				`);
		});

		it("Not equals is true (less)",
		() => {
				const template = new Template(`
					@{ if A != 90 }
						It's a test
					@{ end if }
				`);

				const result = template.render({
					"A": 89
				});

				expect(result).toEqual(`
					
						It's a test
					
				`);
		});

		it("Less than or equals is true (less)",
		() => {
				const template = new Template(`
					@{ if A <= 23 }
						It's a test
					@{ end if }
				`);

				const result = template.render({
					"A": 22
				});

				expect(result).toEqual(`
					
						It's a test
					
				`);
		});

		it("Less than or equals is true (equals)",
		() => {
				const template = new Template(`
					@{ if A <= 23 }
						It's a test
					@{ end if }
				`);

				const result = template.render({
					"A": 23
				});

				expect(result).toEqual(`
					
						It's a test
					
				`);
		});

		it("Less than or equals is false (more)",
		() => {
				const template = new Template(`
					@{ if A <= 23 }
						It's a test
					@{ end if }
				`);

				const result = template.render({
					"A": 24
				});

				expect(result).toEqual(`
					
				`);
		});

		it("More than or equals is true (more)",
		() => {
				const template = new Template(`
					@{ if A >= 23 }
						It's a test
					@{ end if }
				`);

				const result = template.render({
					"A": 24
				});

				expect(result).toEqual(`
					
						It's a test
					
				`);
		});

		it("More than or equals is true (equals)",
		() => {
				const template = new Template(`
					@{ if A >= 23 }
						It's a test
					@{ end if }
				`);

				const result = template.render({
					"A": 23
				});

				expect(result).toEqual(`
					
						It's a test
					
				`);
		});

		it("More than or equals is false (less)",
		() => {
				const template = new Template(`
					@{ if A >= 23 }
						It's a test
					@{ end if }
				`);

				const result = template.render({
					"A": 22
				});

				expect(result).toEqual(`
					
				`);
		});

		it("Complex expression",
		() => {
				const template = new Template(`
					@{ if (24 + 3) + (10 * 25)/5 - (24 * 7 / 8*9) * (242) + A * B = 77 }
						It's a test
					@{ end if }
				`);

				const result = template.render({
					"A": 189,
					"B": 242
				});

				expect(result).toEqual(`
					
						It's a test
					
				`);
		});
	}
);
