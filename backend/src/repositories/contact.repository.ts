async findLinkedContacts(primaryId: number) {
  return prisma.contact.findMany({
    where: {
      OR: [
        { id: primaryId },
        { linkedId: primaryId }
      ]
    },
    orderBy: {
      createdAt: "asc"
    }
  });
}

async updateToSecondary(
  id: number,
  linkedId: number
) {
  return prisma.contact.update({
    where: { id },
    data: {
      linkedId,
      linkPrecedence: LinkPrecedence.secondary
    }
  });
}