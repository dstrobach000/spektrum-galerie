export type ContactRole = {
  name: string;
  role: string;
  email: string;
};

export type Contact = {
  address: string[];
  mapLink: string;
  invoiceDetails: string[];
  openingHours: string;
  facebook: string;
  instagram: string;
  roles: ContactRole[];
};
