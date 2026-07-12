import { ContactRepository } from "../repositories/contact.repository";
import { IdentifyRequest } from "../types/identify.types";

export class IdentifyService {

  private repository = new ContactRepository();

  async identify(data: IdentifyRequest) {

    const contacts = await this.repository.findByEmailOrPhone(
      data.email,
      data.phoneNumber
    );

    console.log(contacts);

    return contacts;
  }

}