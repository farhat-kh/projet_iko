import { vi, describe, expect, it, test, Boolean} from "vitest";
import { userController } from "../controllers/user.controller.js";

import { Users } from "../models/user.model.js";


describe("userController", () => {
    it("getAllUsers", () => {
        const getAllUsers = vi.spyOn(Users, "find");
        userController.getAllUsers();
        expect(getAllUsers).toHaveBeenCalled();
    });
});

test("getUser", () => {
    const getUser = vi.spyOn(Users, "findById");
    userController.getUser();
    expect(getUser).toHaveBeenCalled();
})
