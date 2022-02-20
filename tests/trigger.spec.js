import { Confirmation } from '../src/confirmation'

describe('The trigger button', function () {
    beforeEach(function () {
        let openDialogs = document.querySelectorAll(".are-you-sure");
        for (const dialog of openDialogs) {
            dialog.remove()
        }
    });

    it("should show the confirmation on click", function () {
        let fakeButton = document.createElement("button");
        let confirmation = new Confirmation(fakeButton);

        fakeButton.click();

        let openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(1);
    });

    it("should not show the confirmation if already visible", function () {
        let fakeButton = document.createElement("button");
        let confirmation = new Confirmation(fakeButton);

        fakeButton.click();

        let openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(1);

        fakeButton.click();

        openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(1);
    });

    it("should call the onClick callback on click", function () {
        let callbackSpy = jasmine.createSpy("onClick_Callback");
        let config = { onClick: callbackSpy };
        let fakeButton = document.createElement("button");
        let confirmation = new Confirmation(fakeButton, config);

        fakeButton.click();

        expect(callbackSpy).toHaveBeenCalledTimes(1);
    });
});