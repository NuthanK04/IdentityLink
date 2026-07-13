import prisma from "../config/prisma";
import { LinkPrecedence } from "@prisma/client";

export class ContactRepository {
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
        linkedId,
        email,
        phoneNumber,
        linkPrecedence: LinkPrecedence.secondary,
      },
    });
  }

  async findLinkedContacts(primaryId: number) {
    return prisma.contact.findMany({
      where: {
        OR: [
          { id: primaryId },
          { linkedId: primaryId },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }

  async updateToSecondary(id: number, linkedId: number) {
    return prisma.contact.update({
      where: {
        id,
      },
      data: {
        linkedId,
        linkPrecedence: LinkPrecedence.secondary,
      },
    });
  }

  async updateSecondaryContacts(
    oldPrimaryId: number,
    newPrimaryId: number
  ) {
    return prisma.contact.updateMany({
      where: {
        linkedId: oldPrimaryId,
      },
      data: {
        linkedId: newPrimaryId,
      },
    });
  }

  async getAllContacts() {
    return prisma.contact.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}