import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

export const newspostSchema = {
  type: "object",
  properties: {
    title: { type: "string", maxLength: 50 },
    text: { type: "string", maxLength: 256 },
    genre: { type: "string", enum: ["Politic", "Business", "Sport", "Other"] },
    isPrivate: { type: "boolean" },
  },
  required: ["title", "text", "genre", "isPrivate"],
  additionalProperties: false,
};

export const validateNewspost = ajv.compile(newspostSchema);
