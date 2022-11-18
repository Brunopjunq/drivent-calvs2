import { notFoundError } from "@/errors";
import { TicketEntity } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";

async function getTicket(userId: number): Promise<TicketEntity> {
  const ticket = await ticketsRepository.getTicket(userId);

  if(!ticket) throw notFoundError();

  return exclude(ticket, "Enrollment");
}

const ticketsService = {
  getTicket
};

export default ticketsService;
