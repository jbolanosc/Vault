import "reflect-metadata";
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const connectRedis = require("connect-redis");
const RateLimit = require("express-rate-limit");
const RateLimitRedisStore = require("rate-limit-redis");
import { Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { Routes } from "./routes/Routes";
import { redis } from "./redis";
import { redisSessionPrefix, listingCacheKey } from "./constants";
import { rateLimiterUsingThirdParty } from "./middlewares";

class App {
  public app: Application;
  public routePrv: Routes;
  private SESSION_SECRET = "ajslkjalksjdfkl";
  private RedisStore = connectRedis(session);

  constructor(private port?: number | string) {
    this.app = express();

    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.settings();

    this.middleware();

    this.routePrv = new Routes();

    this.routePrv.routes(this.app);
  }

  private settings(): void {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }

  private middleware(): void {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    //this.app.use(rateLimiterUsingThirdParty);
  }

  async listen(): Promise<void> {
    if (process.env.NODE_ENV === "test") {
      await redis.flushall();
    }

    this.app.use(
      new RateLimit({
        store: new RateLimitRedisStore({
          client: redis,
        }),
        windowMs: 15 * 60 * 1000,
        max: 100,
        delayMs: 0,
      })
    );

    this.app.use(
      session({
        store: new this.RedisStore({
          client: redis as any,
          prefix: redisSessionPrefix,
        }),
        name: "qid",
        secret: this.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
      }) as any
    );

    await this.app.listen(this.app.get("port"));
    console.log("Server on port", this.app.get("port"));
  }
}

export default App;
