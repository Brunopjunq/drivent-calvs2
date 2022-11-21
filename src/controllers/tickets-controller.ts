import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response, Request } from "express";
import httpStatus from "http-status";

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticket = await ticketsService.getTicket(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }    
}

export async function getTicketsType(req: Request, res: Response) {
  try {
    const ticketsType = await ticketsService.getTicketsType();
    return res.status(httpStatus.OK).send(ticketsType);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function insertTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;

  try {
    await ticketsService.insertTicket(userId, ticketTypeId);
    const ticket = ticketsService.getTicket(userId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
