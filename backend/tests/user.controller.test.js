// mock la fonction sendEmail pour eviter l'envoi de mail
jest.mock("../services/nodemailer", () => ({
  sendEmail: jest.fn(() => Promise.resolve()),
  sendVerificationEmail: jest.fn(() => Promise.resolve())
}))

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



test("sign renvoie une erreur si email non trouvé", async () => {
  const req = { 
    body: {
      email: `emailInexistant@test.com`, password: "password"
    }
  }
  const res = {}
  const next = jest.fn()
  jest.spyOn(Users, 'findOne').mockResolvedValue(null)
  await userController.sign(req, res, next);
  expect(next).toHaveBeenCalledWith(expect.objectContaining({
    status: 404,
    message: "utilisateur non trouvé"
  }))
})


test("deleteUser desactive un utilisateur avec succès", async () => {
  const exempleUser = {
    _id: "123",
    isActive: true,
    save: jest.fn()
  }
  const req = {
    user: {
      id: "123",  
      role: "user"
    },
    params: {
      id: "123"
    }
  }
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
  const next = jest.fn()
  jest.spyOn(Users, 'findById').mockResolvedValue(exempleUser)
  await userController.deleteUser(req, res, next);
  expect(exempleUser.isActive).toBe(false)
  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.json).toHaveBeenCalledWith({
    message: "Compte désactivé avec succès"
  })
})