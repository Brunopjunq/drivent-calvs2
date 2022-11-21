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

async function insertTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: "RESERVED",
    },
  });
}

async function findUser(userId: number) {
  return await prisma.enrollment.findFirst({
    where: {
      userId,
    }
  });  
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
      TicketType: true,
    },
  });  
}

const ticketsRepository = { getTicket, getTicketsType, insertTicket, findUser, findTicketById };

export default ticketsRepository;
