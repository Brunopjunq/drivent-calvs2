import { prisma } from "@/config";
import { CardData } from "@/protocols";

async function getPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    }
  });    
}

async function insertPayment(ticketId: number, cardData: CardData, value: number) {
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer: cardData.issuer,
      cardLastDigits: String(cardData.number).slice(-4),
    },
  });    
}

const paymentsRepository = {
  getPayment,
  insertPayment
};

export default paymentsRepository;
