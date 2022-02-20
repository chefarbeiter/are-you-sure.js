import { Confirmation } from '../src/confirmation'

describe('A button in the conformation dialog', function () {
    beforeEach(function () {
        let openDialogs = document.querySelectorAll(".are-you-sure");
        for (const dialog of openDialogs) {
            dialog.remove()
        }
    });

    it("should close the confirmation if it is a cancel button", function () {
        let fakeButton = document.createElement("button");
        let confirmation = new Confirmation(fakeButton);
        fakeButton.click();

        let openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(1);

        let noButton = document.querySelector(".ays-no");
        noButton.click();

        openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(0);
    });
});