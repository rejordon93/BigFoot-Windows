// AUTH
export type SignUpProps = {
  username: string;
  email: string;
  password: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

// Profile
export type ProfileData = {
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  zip: string;
};

// Quote
export type QuoteType = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  serviceType: string;
  preferredDate?: Date;
  additionalDetails?: string;
};
