import { jest } from "@jest/globals";

const mockUser = { id: 1, email: "test@example.com", subscription: "starter" };

jest.unstable_mockModule("../services/authServices.js", () => ({
  validateUserCredentials: jest.fn().mockResolvedValue(mockUser),
  createToken: jest.fn().mockReturnValue("test-token-123"),
  setUserToken: jest.fn().mockResolvedValue(undefined),
  toPublicUser: jest.fn((u) => ({ email: u.email, subscription: u.subscription })),

  isEmailInUse: jest.fn(),
  registerUser: jest.fn(),
  getUserById: jest.fn(),
  clearToken: jest.fn(),
  updateUserAvatar: jest.fn(),
}));

const { login } = await import("../controllers/authController.js");

describe("authController.login", () => {
  const makeRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
  };

  it("should respond 200, return token and user with email & subscription as strings", async () => {
    const req = { body: { email: "test@example.com", password: "123456" } };
    const res = makeRes();
    const next = jest.fn();

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);

    const payload = res.json.mock.calls[0][0];
    expect(payload).toHaveProperty("token");
    expect(typeof payload.token).toBe("string");

    expect(payload).toHaveProperty("user");
    expect(payload.user).toHaveProperty("email", "test@example.com");
    expect(payload.user).toHaveProperty("subscription", "starter");
    expect(typeof payload.user.email).toBe("string");
    expect(typeof payload.user.subscription).toBe("string");
  });
});
