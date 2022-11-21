import { notFoundError, unauthorizedError } from "@/errors";
import { PaymentEntity, TicketEntity } from "@/protocols";
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

const paymentsService = {
  getPayment
};

export default paymentsService;
