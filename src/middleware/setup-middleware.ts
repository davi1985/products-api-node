import type { Express } from "express";
import express from "express";
import helmet from "helmet";
import { AppConfig } from "../config/app-config.js";

export const setupMiddleware = (app: Express): void => {
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(AppConfig.publicDir));
};
