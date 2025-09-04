import ContactContent from "@/components/Content/ContactContent";
import { sanityClient } from "@/sanity/client";
import Modal from "@/components/BuildingBlocks/Modal/Modal";
import type { Contact } from "@/types/Contact";

const contactQuery = `
  *[_type == "contact"][0]{
    address,
    mapLink,
    invoiceDetails,
    openingHours,
    facebook,
    instagram,
    roles[] {
      name,
      role,
      email
    }
  }
`;

export default async function KontaktModal() {
  const contact: Contact = await sanityClient.fetch(contactQuery);

  return (
    <Modal isOpen={true} onClose={() => window.history.back()}>
      <ContactContent contact={contact} />
    </Modal>
  );
}
