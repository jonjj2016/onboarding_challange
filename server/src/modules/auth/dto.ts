export interface LoginRequestDto {
  email: string;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
}

export interface JWTPayload {
  sub: string;
  name: string;
  email: string;
}
