import Ajv, { JSONSchemaType } from "ajv";

interface PushResponse {
    error: string;
}

const PushSchema: JSONSchemaType<PushResponse> = {
    type: "object",
    properties: {
        error: { type: "string" },
    },
    required: ["error"],
    additionalProperties: false
};

function Validate(schema: JSONSchemaType<any>, data: any): boolean {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
        throw new Error(`Validation failed: ${validate.errors}`);
    }
    return true
}

export { Validate, PushSchema }
export type { PushResponse};