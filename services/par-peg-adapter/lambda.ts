import serverlessExpress from "@vendia/serverless-express";
import app from "./";

const handler = serverlessExpress({ app });

export {
  handler
};
