const sanitizeValue = (value) => {
    if (typeof value === "string") {
      return value.trim();
    }
  
    if (Array.isArray(value)) {
      return value.map(sanitizeValue);
    }
  
    if (value && typeof value === "object") {
      const cleaned = {};
  
      for (const key of Object.keys(value)) {
        if (key.startsWith("$") || key.includes(".")) {
          continue;
        }
        cleaned[key] = sanitizeValue(value[key]);
      }
  
      return cleaned;
    }
  
    return value;
  };
  
  module.exports = { sanitizeValue };