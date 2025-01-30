import { Confirmation } from '../src/confirmation';

describe('The placement configuration', function () {
    beforeEach(function () {
        let openDialogs = document.querySelectorAll(".are-you-sure");
        for (const dialog of openDialogs) {
            dialog.remove();
        }
    });

    it("Left should show the dialog on the left hand side of the button", function () {
        let fakeButton = document.createElement("button");
        fakeButton.style.margin = "50px";
        document.body.append(fakeButton);
        let confirmation = new Confirmation(fakeButton, { placement: "left" });
        fakeButton.click();

        let dialog = document.querySelector(".are-you-sure");
        expect(dialog.offsetParent).toBe(fakeButton.offsetParent);
        expect(dialog.offsetLeft).toBeLessThan(fakeButton.offsetLeft);
    });

    // it("Right should show the dialog on the right hand side of the button", function () {
    //     let fakeButton = document.createElement("button");
    //     fakeButton.style.margin = "50px";
    //     document.body.append(fakeButton);
    //     let confirmation = new Confirmation(fakeButton, { placement: "right" });
    //     fakeButton.click();

    //     let dialog = document.querySelector(".are-you-sure");
    //     expect(dialog.offsetParent).toBe(fakeButton.offsetParent);
    //     expect(dialog.offsetLeft).toBeGreaterThan(fakeButton.offsetLeft);
    // });
});