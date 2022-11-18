import { notFoundError } from "@/errors";
import { TicketEntity, TicketType } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";

async function getTicket(userId: number): Promise<TicketEntity> {
  const ticket = await ticketsRepository.getTicket(userId);

  if(!ticket) throw notFoundError();

  return exclude(ticket, "Enrollment");
}

async function getTicketsType(): Promise<TicketType[]> {
  const ticketsType = await ticketsRepository.getTicketsType();

  return ticketsType;
}

const ticketsService = {
  getTicket,
  getTicketsType
};

export default ticketsService;
