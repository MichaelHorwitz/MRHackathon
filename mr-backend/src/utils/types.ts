import { SafeUser } from "src/auth/auth.service";

export interface AuthenticatedRequest extends Request {
  user: SafeUser;
}