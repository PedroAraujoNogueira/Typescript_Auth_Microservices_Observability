import Notification from "./notification";

describe("Unit tests for notifications", () => {

    it("should create errors", () => {
        const notification = new Notification();

        const error = {
            message: "error message",
            context: "user",
        };

        notification.addError(error);

        expect(notification.messages("user")).toBe("user: error message,");
    
        const error2 = {
            message: "error message2",
            context: "user",
        };

        notification.addError(error2);

        expect(notification.messages("user")).toBe("user: error message,user: error message2,");

        const error3 = {
            message: "error message3",
            context: "user",
        };

        notification.addError(error3);

        expect(notification.messages("user")).toBe("user: error message,user: error message2,user: error message3,");
        expect(notification.messages()).toBe("user: error message,user: error message2,user: error message3,");
    })

    it("should check if notification has at least one error", () => {
        const notification = new Notification();
        const error = {
            message: "error message",
            context: "user",
        }      

        notification.addError(error);

        expect(notification.hasError()).toBe(true);
    })

    it("should get all errors", () => {
        const notification = new Notification();
        const error = {
            message: "error message",
            context: "user",
        }      

        notification.addError(error);

        expect(notification.getErrors()).toEqual([error]);
    })
})