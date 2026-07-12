import { ContactRepository } from "../repositories/contact.repository";
import {
  IdentifyRequest,
  IdentifyResponse,
} from "../types/identify.types";

export class IdentifyService {
  private repository = new ContactRepository();

  async identify(data: IdentifyRequest): Promise<IdentifyResponse> {
    const existingContacts = await this.repository.findByEmailOrPhone(
      data.email,
      data.phoneNumber
    );

    // Scenario 1: No existing contact
    if (existingContacts.length === 0) {
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

    // Temporary response for now
    const primaryContact = existingContacts[0];

    return {
      contact: {
        primaryContactId: primaryContact.id,
        emails: primaryContact.email ? [primaryContact.email] : [],
        phoneNumbers: primaryContact.phoneNumber
          ? [primaryContact.phoneNumber]
          : [],
        secondaryContactIds: [],
      },
    };
  }
}