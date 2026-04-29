describe('learning path', () => {
	it('loads the overview and navigates to the component lesson', () => {
		cy.visit('/');
		cy.contains('h2', 'Welcome').should('be.visible');
		cy.contains('a', 'Component Composition').click();
		cy.url().should('include', '/components');
		cy.contains('h2', 'Component Composition').should('be.visible');
		cy.contains('Progress: 0/3 (0%)').should('be.visible');
	});

	it('marks a component lesson complete', () => {
		cy.visit('/components');
		cy.contains('button', 'Mark done').click();
		cy.contains('Progress: 1/3 (33%)').should('be.visible');
		cy.contains('button', 'Reset all').click();
		cy.contains('Progress: 0/3 (0%)').should('be.visible');
	});

	it('calls the endpoint example API', () => {
		cy.request('/kit-endpoints/api?topic=actions').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.topic).to.eq('actions');
			expect(response.body.rows).to.include('Use named actions for multi-form pages.');
		});
	});

	it('adds and advances a capstone item', () => {
		cy.visit('/capstone');
		cy.contains('h2', 'Capstone: Learning Tracker').should('be.visible');
		cy.get('input[name="title"]').type('Draft endpoint walkthrough');
		cy.contains('button', 'Add item').click();
		cy.contains('li', 'Draft endpoint walkthrough').should('be.visible');
		cy.contains('li', 'Draft endpoint walkthrough').within(() => {
			cy.contains('button', 'Advance').click();
			cy.contains('In progress').should('be.visible');
		});
	});
});
