import { getTickets, getTicketsType, insertTicket } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .post("/", insertTicket)
  .get("/types", getTicketsType);

export { ticketsRouter };
