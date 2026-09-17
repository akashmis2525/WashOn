export interface SendOtpRequest {
  phoneNumber: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  isExistingUser: boolean;
  expiresInSeconds: number;
}

export interface VerifyOtpRequest {
  phoneNumber: string;
  otp: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboarded: boolean;
  phoneNumber: string | null;
  tokens: AuthTokens | null;
  hasLocationPermission: boolean;
}
