import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Command: a
    .model({
      id: a.id().required(),
      action: a.string().required(),
      value: a.integer().required()
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool"
  },
});
