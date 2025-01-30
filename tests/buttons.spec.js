import { Confirmation } from '../src/confirmation';

describe('A button in the conformation dialog', function () {
    beforeEach(function () {
        let openDialogs = document.querySelectorAll(".are-you-sure");
        for (const dialog of openDialogs) {
            dialog.remove();
        }
    });

    it("should close the confirmation if it is a cancel button", function () {
        let fakeButton = document.createElement("button");
        document.body.append(fakeButton);
        let confirmation = new Confirmation(fakeButton);
        fakeButton.click();

        let openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(1);

        let noButton = document.querySelector(".ays-no");
        noButton.click();

        openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(0);
    });

    it("should close the confirmation if it is a confirm button", function () {
        let fakeButton = document.createElement("button");
        document.body.append(fakeButton);
        let confirmation = new Confirmation(fakeButton);
        fakeButton.click();

        let openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(1);

        let yesButton = document.querySelector(".ays-yes");
        yesButton.click();

        openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(0);
    });

    it("should call the onConfirm callback if it is a confirm button", function () {
        let fakeButton = document.createElement("button");
        document.body.append(fakeButton);
        let confirmCallback = jasmine.createSpy("confirm");
        let dismissCallback = jasmine.createSpy("dismiss");
        let config = { onConfirm: confirmCallback, onDismiss: dismissCallback };
        let confirmation = new Confirmation(fakeButton, config);
        fakeButton.click();

        let openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(1);

        let yesButton = document.querySelector(".ays-yes");
        yesButton.click();

        expect(confirmCallback).toHaveBeenCalledTimes(1);
        expect(dismissCallback).not.toHaveBeenCalled();
    });

    it("should call the onDismiss callback if it is a cancel button", function () {
        let fakeButton = document.createElement("button");
        document.body.append(fakeButton);
        let confirmCallback = jasmine.createSpy("confirm");
        let dismissCallback = jasmine.createSpy("dismiss");
        let config = { onConfirm: confirmCallback, onDismiss: dismissCallback };
        let confirmation = new Confirmation(fakeButton, config);
        fakeButton.click();

        let openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(1);

        let noButton = document.querySelector(".ays-no");
        noButton.click();

        expect(dismissCallback).toHaveBeenCalledTimes(1);
        expect(confirmCallback).not.toHaveBeenCalled();
    });


    it("should call the onDismiss callback if it is a cancel button and not hide if the callback returns something", function () {
        let fakeButton = document.createElement("button");
        document.body.append(fakeButton);
        let config = { onDismiss: () => "something" };
        let confirmation = new Confirmation(fakeButton, config);
        fakeButton.click();

        let openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(1);

        let noButton = document.querySelector(".ays-no");
        noButton.click();

        openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(1);
    });

    it("should call a custom callback", function () {
        let fakeButton = document.createElement("button");
        document.body.append(fakeButton);
        let customCallback = jasmine.createSpy("callback");
        let config = {
            buttons: [{
                label: 'My Custom Button',
                onClick: customCallback,
                classes: 'my-button'
            }]
        };
        let confirmation = new Confirmation(fakeButton, config);
        fakeButton.click();

        let openPopups = document.querySelectorAll(".are-you-sure");
        expect(openPopups.length).toBe(1);

        let myButton = document.querySelector(".my-button");
        myButton.click();
        expect(customCallback).toHaveBeenCalledTimes(1);
    });
});