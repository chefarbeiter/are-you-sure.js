import { Confirmation } from '../src/confirmation'

describe('The configuration', function () {
    it("should be initialized with default placement", function () {
        let fakeButton = document.createElement("button");
        let instance = new Confirmation(fakeButton);
        expect(instance._config.placement).toBe('top');
    });

    it("should be initialized with given placement", function () {
        let fakeButton = document.createElement("button");
        let instance = new Confirmation(fakeButton, { placement: 'bottom' });
        expect(instance._config.placement).toBe('bottom');
    });

    it("should throw if an unknown style is given", function () {
        let fakeButton = document.createElement("button");
        let config = { style: 'tailwindcss' };

        expect(() => new Confirmation(fakeButton, config)).toThrowMatching(error => error.startsWith('Style tailwindcss is unknown'));

        let instance = new Confirmation(fakeButton, { placement: 'bottom' });
        expect(instance._config.placement).toBe('bottom');
    });
});