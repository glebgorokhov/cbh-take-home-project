const crypto = require("crypto");
const { deterministicPartitionKey, TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = require("./dpk");

describe("deterministicPartitionKey", () => {
  test("should return TRIVIAL_PARTITION_KEY when event is undefined", () => {
    expect(deterministicPartitionKey()).toBe(TRIVIAL_PARTITION_KEY);
  });

  test("should return partitionKey when event object contains partitionKey", () => {
    const partitionKey = "abc";
    const event = { partitionKey };
    expect(deterministicPartitionKey(event)).toBe(partitionKey);
  });

  test("should return hashed key when event object does not contain partitionKey", () => {
    const testData = "test";
    const event = { data: testData };
    const hashed = deterministicPartitionKey(event);
    expect(hashed).not.toBe(testData);
    expect(hashed).toHaveLength(128); // sha3-512 produces 128 hex digits
  });

  test("should return hashed key when partitionKey length exceeds limit", () => {
    const event = { partitionKey: "a".repeat(MAX_PARTITION_KEY_LENGTH + 1) };
    const hashed = deterministicPartitionKey(event);
    expect(hashed).toHaveLength(128); // sha3-512 produces 128 hex digits
  });

  test("should return the same hashed key for the same input", () => {
    const event = { data: "test" };
    const hashed1 = deterministicPartitionKey(event);
    const hashed2 = deterministicPartitionKey(event);
    expect(hashed1).toBe(hashed2);
  });

  test("should return hashed JSON string when event object does not contain partitionKey", () => {
    const event = { data: "test" };
    const hashed = deterministicPartitionKey(event);
    const expected = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    expect(hashed).toBe(expected);
  });

  test("should return the original key when partitionKey length is equal to limit", () => {
    const event = { partitionKey: "a".repeat(MAX_PARTITION_KEY_LENGTH) };
    expect(deterministicPartitionKey(event)).toBe(event.partitionKey);
  });
});
