// Interface for User Request
export interface IUserRequest {
  displayName: string;
  username: string;
  password: string;
  avatar: string;
  managerName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

// Interface for User Response
export interface IUserResponse {
  _id: string;
  displayName: string;
  username: string;
  avatar: string;
  managerName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}