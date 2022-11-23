import express from "express";

declare global {
  namespace Express {
    interface Request {
      id?: Record<number,any>,
      customer?: Record<any>,
      tokenPush?: Record<string,any>
    }
  }
}