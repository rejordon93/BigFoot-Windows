// AUTH
export type SignUpProps = {
  username: string;
  email: string;
  password: string;
};

export type employeeSignUp = {
  username: string;
  email: string;
  password: string;
  position: string;
  role: "EMPLOYEE" | "ADMIN";
  startDate: string; // ISO date string
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
  phone: string;
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

export type DecodedToken = {
  id: number;
  email: string;
  role: "USER" | "EMPLOYEE" | "ADMIN";
  exp: number;
};
