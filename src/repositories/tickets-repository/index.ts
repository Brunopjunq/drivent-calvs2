import { prisma } from "@/config";

async function getTicket(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId
      },
    },
    include: {
      TicketType: true,
      Enrollment: true,
    },
  });
}

async function getTicketsType() {
  return prisma.ticketType.findMany();
}

const ticketsRepository = { getTicket, getTicketsType };

export default ticketsRepository;
