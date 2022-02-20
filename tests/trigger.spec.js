import { Confirmation } from '../src/confirmation'

describe('The trigger button', function () {
    it("should show the confirmation on click", function () {
        let fakeButton = document.createElement("button");
        let confirmation = new Confirmation(fakeButton);

        fakeButton.click();

        let openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(1);
    });
});