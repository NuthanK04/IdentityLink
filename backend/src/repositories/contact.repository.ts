import prisma from "../config/prisma";
import { LinkPrecedence } from "@prisma/client";

export class ContactRepository {

  async findByEmail(email: string) {
    return prisma.contact.findMany({
      where: {
        email,
      },
    });
  }

  async findByPhone(phoneNumber: string) {
    return prisma.contact.findMany({
      where: {
        phoneNumber,
      },
    });
  }

  async findByEmailOrPhone(email?: string, phoneNumber?: string) {
    return prisma.contact.findMany({
      where: {
        OR: [
          ...(email ? [{ email }] : []),
          ...(phoneNumber ? [{ phoneNumber }] : []),
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async createPrimaryContact(email?: string, phoneNumber?: string) {
    return prisma.contact.create({
      data: {
        email,
        phoneNumber,
        linkPrecedence: LinkPrecedence.primary,
      },
    });
  }

  async createSecondaryContact(
    linkedId: number,
    email?: string,
    phoneNumber?: string
  ) {
    return prisma.contact.create({
      data: {
        email,
        phoneNumber,
        linkedId,
        linkPrecedence: LinkPrecedence.secondary,
      },
    });
  }
}