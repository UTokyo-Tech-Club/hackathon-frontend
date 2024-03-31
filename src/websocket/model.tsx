import Ajv, { JSONSchemaType } from "ajv";

function Validate(schema: JSONSchemaType<any>, data: any): boolean {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
        throw new Error(`Validation failed: ${validate.errors}`);
    }
    return true
}


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


interface PingResponse {
    response: string;
}

const PingSchema: JSONSchemaType<PingResponse> = {
    type: "object",
    properties: {
        response: { type: "string" },
    },
    required: ["response"],
    additionalProperties: false
};


interface ProfileContentResponse {
    content: string;
    error: string;
}

const ProfileContentSchema: JSONSchemaType<ProfileContentResponse> = {
    type: "object",
    properties: {
        content: { type: "string" }, // Fix the type of the content property
        error: { type: "string" },
    },
    required: ["content", "error"],
    additionalProperties: false
};


export { Validate, PushSchema, PingSchema, ProfileContentSchema }
export type { PushResponse, PingResponse, ProfileContentResponse };