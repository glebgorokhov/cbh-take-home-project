const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const hashData = data => crypto.createHash("sha3-512").update(data).digest("hex");
const convertToString = data => typeof data !== "string" ? JSON.stringify(data) : data;
const truncateKey = key => key.length > MAX_PARTITION_KEY_LENGTH ? hashData(key) : key;

exports.deterministicPartitionKey = (event) => {
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    candidate = event.partitionKey || hashData(JSON.stringify(event));
  }

  return truncateKey(convertToString(candidate));
};

/**
 * Export constants for testing
 */
exports.TRIVIAL_PARTITION_KEY = TRIVIAL_PARTITION_KEY;
exports.MAX_PARTITION_KEY_LENGTH = MAX_PARTITION_KEY_LENGTH;
