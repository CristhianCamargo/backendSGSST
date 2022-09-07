import express from "express";

declare global {
  namespace Express {
    interface Request {
      uid?: Record<number,any>,
      usuario?: Record<any>,
      tokenPush?: Record<string,any>
    }
  }
}