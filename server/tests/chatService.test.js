const { processMessage } = require("../services/chatService");
const Chat = require("../models/Chat");

jest.mock("../models/Chat");
jest.mock("../utils/aiClient", () => ({
  getAIResponse: jest.fn(() => Promise.resolve("Hello from AI")),
}));

describe("Chat Service", () => {
  it("should return AI response and save messages", async () => {
    Chat.find.mockResolvedValue([]);
    Chat.prototype.save = jest.fn();

    const response = await processMessage("user123", "Hi there");

    expect(response).toBe("Hello from AI");
    expect(Chat.prototype.save).toHaveBeenCalledTimes(2);
  });
});
