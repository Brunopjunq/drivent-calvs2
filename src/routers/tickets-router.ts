import { getTickets, getTicketsType } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .post("/",)
  .get("/types", getTicketsType);

export { ticketsRouter };
