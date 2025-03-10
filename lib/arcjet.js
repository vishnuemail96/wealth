import arcjet from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["clerkUserId"], // Replace with the correct user ID
  rules: [], // No rate limit applied
});

export default aj;
