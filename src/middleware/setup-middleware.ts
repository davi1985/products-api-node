import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { AppConfig } from "../config/app-config.js";
import {
  securityHeaders,
  rateLimiter,
  corsOptions,
  jsonLimit,
} from "../config/security-config.js";

export const setupMiddleware = (app: Express): void => {
  app.use(helmet(securityHeaders));

  app.use(cors(corsOptions));

  app.use(rateLimiter);

  app.use(express.json({ limit: jsonLimit }));
  app.use(express.urlencoded({ extended: true, limit: jsonLimit }));

  app.use(express.static(AppConfig.publicDir));
};
