import { ContactRepository } from "../repositories/contact.repository";
import {
  IdentifyRequest,
  IdentifyResponse,
} from "../types/identify.types";

export class IdentifyService {
  private repository = new ContactRepository();

  async identify(data: IdentifyRequest): Promise<IdentifyResponse> {
    // Find existing contacts by email or phone
    const contacts = await this.repository.findByEmailOrPhone(
      data.email,
      data.phoneNumber
    );

    // CASE 1: No existing contact -> Create Primary Contact
    if (contacts.length === 0) {
      const contact = await this.repository.createPrimaryContact(
        data.email,
        data.phoneNumber
      );

      return {
        contact: {
          primaryContactId: contact.id,
          emails: contact.email ? [contact.email] : [],
          phoneNumbers: contact.phoneNumber ? [contact.phoneNumber] : [],
          secondaryContactIds: [],
        },
      };
    }

    // Find all primary contacts
const primaryContacts = contacts.filter(
  (c) => c.linkPrecedence === "primary"
);

// Oldest primary remains primary
primaryContacts.sort(
  (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
);

const primary = primaryContacts[0];

// If multiple primary contacts exist, merge them
if (primaryContacts.length > 1) {
  for (let i = 1; i < primaryContacts.length; i++) {
    const secondaryPrimary = primaryContacts[i];

    // Convert newer primary into secondary
    await this.repository.updateToSecondary(
      secondaryPrimary.id,
      primary.id
    );

    // Move all its secondary contacts
    await this.repository.updateSecondaryContacts(
      secondaryPrimary.id,
      primary.id
    );
  }
}

    // Check if email and phone already exist
    const emailExists = contacts.some((c) => c.email === data.email);
    const phoneExists = contacts.some(
      (c) => c.phoneNumber === data.phoneNumber
    );

    // CASE 2: Existing contact but new email or phone
    if (!emailExists || !phoneExists) {
      await this.repository.createSecondaryContact(
        primary.id,
        data.email,
        data.phoneNumber
      );
    }

    // Fetch all linked contacts
    const linkedContacts = await this.repository.findLinkedContacts(primary.id);

    // Collect unique emails
    const emails = [
      ...new Set(
        linkedContacts
          .map((c) => c.email)
          .filter((email): email is string => Boolean(email))
      ),
    ];

    // Collect unique phone numbers
    const phoneNumbers = [
      ...new Set(
        linkedContacts
          .map((c) => c.phoneNumber)
          .filter((phone): phone is string => Boolean(phone))
      ),
    ];

    // Collect secondary contact IDs
    const secondaryContactIds = linkedContacts
      .filter((c) => c.linkPrecedence === "secondary")
      .map((c) => c.id);

    return {
      contact: {
        primaryContactId: primary.id,
        emails,
        phoneNumbers,
        secondaryContactIds,
      },
    };
  }
}