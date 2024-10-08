import * as Blockly from 'blockly';

describe('Blockly component', () => {

    beforeEach(() => {
        cy.visit('http:localhost:4200');
    });

    it('should check all the buttons', () => {
        cy.get('button').its('length').then((buttonCount) => {
            expect(buttonCount).equal(3);
        });
        cy.get('#showSaveForm').click();
        cy.get('button').its('length').then((buttonCount) => {
            expect(buttonCount).equal(4);
        });
    })

    it('should save workspace and load it', () => {
        cy.get('#showSaveForm').click();
        cy.get('#inputTitle').type('Test workspace');
        cy.get('#saveWorkspaceButton').click();
        cy.get('#showWorkspacesList').click();
        cy.get('.workspace').its('length').then((workspaceCount) => {
            expect(workspaceCount).to.be.greaterThan(0)
        })
    })


})