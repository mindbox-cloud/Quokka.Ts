import { Template } from "../quokka";

describe(
	"Rendering 'if' block basic",
	() => {

		it("Simple condition is true",
		() => {
			const template = new Template(`
				@{ if IsTest }
					It's a test
				@{ end if }
			`);
			
			const result = template.render({
				"IsTest": true
			});

			expect(result).toEqual(`
				
					It's a test
				
			`);
		});

		it("Simple condition is false",
		() => {
			const template = new Template(`
				@{ if IsTest }
					It's a test
				@{ end if }
			`);

			const result = template.render({
				"IsTest": false
			});

			expect(result).toEqual(`
				
			`);
		});

		it("Simple condition with else",
		() => {
			const template = new Template(`
				@{ if IsTest }
					It's a test
				@{ else }
					It's not a test
				@{ end if }
			`);

			const result = template.render({
				"IsTest": true
			});

			expect(result).toEqual(`
				
					It's a test
				
			`);
		});

		it("Simple condition with else is false",
		() => {
			const template = new Template(`
				@{ if IsTest }
					It's a test
				@{ else }
					It's not a test
				@{ end if }
			`);

			const result = template.render({
				"IsTest": false
			});

			expect(result).toEqual(`
				
					It's not a test
				
			`);
		});

		it("Two branches, and both is true: branch1",
		() => {
			const template = new Template(`
				@{ if IsTest }
					It's a test
				@{ else if IsStaging }
					It's staging
				@{ end if }
			`);

			const result = template.render({
				"IsTest": true,
				"IsStaging": true
			});

			expect(result).toEqual(`
				
					It's a test
				
			`);
		});

		it("Two branches, and only first is true: branch1",
		() => {
			const template = new Template(`
				@{ if IsTest }
					It's a test
				@{ else if IsStaging }
					It's staging
				@{ end if }
			`);

			const result = template.render({
				"IsTest": true,
				"IsStaging": false
			});

			expect(result).toEqual(`
				
					It's a test
				
			`);
		});

		it("Two branches, and only second is true: branch2",
		() => {
			const template = new Template(`
				@{ if IsTest }
					It's a test
				@{ else if IsStaging }
					It's staging
				@{ end if }
			`);

			const result = template.render({
				"IsTest": false,
				"IsStaging": true
			});

			expect(result).toEqual(`
				
					It's staging
				
			`);
		});

		it("Two branches, and both is false: nothing",
		() => {
			const template = new Template(`
				@{ if IsTest }
					It's a test
				@{ else if IsStaging }
					It's staging
				@{ end if }
			`);

			const result = template.render({
				"IsTest": false,
				"IsStaging": false
			});

			expect(result).toEqual(`
				
			`);
		});

		it("N branches without else",
		() => {
			const template = new Template(`
				@{ if IsRed }
					Red
				@{ else if IsGreen }
					Green
				@{ else if IsBlue }
					Blue
				@{ else if IsYellow }
					Yellow
				@{ end if }
			`);

			const result = template.render({
				"IsRed": false,
				"IsGreen": false,
				"IsBlue": true,
				"IsYellow": false
			});

			expect(result).toEqual(`
				
					Blue
				
			`);
		});

		it("N branches with else: else if branch is true",
		() => {
			const template = new Template(`
				@{ if IsRed }
					Red
				@{ else if IsGreen }
					Green
				@{ else }
					Unknown color
				@{ end if }
			`);

			const result = template.render({
				"IsRed": false,
				"IsGreen": true
			});

			expect(result).toEqual(`
				
					Green
				
			`);
		});

		it("N branches with else: no branch is true",
		() => {
			const template = new Template(`
				@{ if IsRed }
					Red
				@{ else if IsGreen }
					Green
				@{ else }
					Unknown color
				@{ end if }
			`);

			const result = template.render({
				"IsRed": false,
				"IsGreen": false
			});

			expect(result).toEqual(`
				
					Unknown color
				
			`);
		});

		it("Simple condition with parentheses",
		() => {
			const template = new Template(`
				@{ if (((IsTest) Or IsA) And IsB) }
					It's a test
				@{ end if }
			`);

			const result = template.render({
				"IsTest": true,
				"IsA": false,
				"IsB": true,
			});

			expect(result).toEqual(`
				
					It's a test
				
			`);
		});

		it("Instructions case is insensitivity",
		() => {
			const template = new Template(`
				@{ If IsRed }
					Red
				@{ eLsE iF IsGreen }
					Green
				@{ ElSe }
					Unknown color
				@{ ENd IF }
			`);

			const result = template.render({
				"IsRed": false,
				"IsGreen": true
			});

			expect(result).toEqual(`
				
					Green
				
			`);
		});

		it("Empty blocks",
		() => {
			const template = new Template("@{ if IsRed }@{ else if IsGreen }@{ else }@{ end if }");

			const result = template.render({
				"IsRed": false,
				"IsGreen": true
			});

			expect(result).toEqual("");
		});
	}
);
