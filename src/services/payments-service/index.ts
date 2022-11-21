import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentEntity, TicketEntity, CardData } from "@/protocols";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";

async function checkTicket(ticketId: number, userId: number): Promise<TicketEntity> {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if(!ticket) throw notFoundError();
    
  if(userId !== ticket.Enrollment.userId) throw unauthorizedError();

  return exclude(ticket, "Enrollment");
}

async function getPayment(ticketId: number, userId: number): Promise<PaymentEntity> {
  await checkTicket(ticketId, userId);
    
  const payment = await paymentsRepository.getPayment(ticketId);
  if(!payment) throw notFoundError();

  return payment;
}

async function insertPayment(ticketId: number, userId: number, cardData: CardData): Promise<PaymentEntity> {
  const ticket = await checkTicket(ticketId, userId);
    
  const payment = await paymentsRepository.insertPayment(ticketId, cardData, ticket.TicketType.price);
  if(!payment) throw notFoundError();

  await ticketsRepository.updateTicket(ticketId);

  return await getPayment(ticketId, userId);
}

const paymentsService = {
  getPayment,
  insertPayment
};

export default paymentsService;
