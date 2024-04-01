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
    content: object;
    error: string;
}

const ProfileContentSchema: JSONSchemaType<ProfileContentResponse> = {
    type: "object",
    properties: {
        content: { type: "object" },
        error: { type: "string" },
    },
    required: ["content", "error"],
    additionalProperties: false
};


interface TweetResponse {
    tweet: object;
    error: string;
}

const TweetSchema: JSONSchemaType<TweetResponse> = {
    type: "object",
    properties: {
        tweet: { type: "object" },
        error: { type: "string" },
    },
    required: ["tweet", "error"],
    additionalProperties: false
};


export { Validate, PushSchema, PingSchema, ProfileContentSchema, TweetSchema }
export type { PushResponse, PingResponse, ProfileContentResponse, TweetResponse };