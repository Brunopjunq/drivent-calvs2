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

const ticketsRepository = { getTicket };

export default ticketsRepository;
