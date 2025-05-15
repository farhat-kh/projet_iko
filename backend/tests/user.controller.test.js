const userController = require("../controllers/user.controller");
const Users = require("../models/user.model");

jest.mock("../models/user.model");

describe("userController.getAllUsers", () => {
  it("devrait retourner tous les utilisateurs", async () => {
    const mockUsers = [{ nom: "Jean" }, { nom: "Claire" }];
    Users.find.mockResolvedValue(mockUsers);

    const req = {};
    const res = {
       status: jest.fn().mockReturnThis(),
       json: jest.fn()
};


    await userController.getAllUsers(req, res);

    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });
});
