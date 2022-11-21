import { notFoundError } from "@/errors";
import { TicketEntity, TicketType } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";
import userRepository from "@/repositories/user-repository";
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

async function checkUser(userId: number): Promise<void> {
  const user = await userRepository.findById(userId);
  if(!user) throw notFoundError();  
}

async function insertTicket(userId: number, ticketTypeId: number) {
  checkUser(userId);
  
  const userEnrollment = await ticketsRepository.findUser(userId);
  if (!userEnrollment) throw notFoundError();

  const ticket = await ticketsRepository.insertTicket(ticketTypeId, userEnrollment.id);
  
  return ticket;
}

const ticketsService = {
  getTicket,
  getTicketsType,
  insertTicket
};

export default ticketsService;
