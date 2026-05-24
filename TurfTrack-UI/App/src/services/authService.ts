const GOOGLE_AUTH_API_URL = 'http://localhost:5194/api/auth/google';

export interface GoogleCredentialResponse {
  credential: string;
}

export interface AuthResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

/**
 * Decodes Google JWT token to extract user information
 * @param token - Google JWT token
 * @returns User information extracted from token
 */
export const decodeGoogleToken = (token: string): UserInfo | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const decoded = JSON.parse(jsonPayload);
    
    return {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Authenticates user with Google token via backend API
 * @param token - Google JWT token from credential response
 * @returns Promise with authentication result
 */
export const authenticateWithGoogle = async (token: string): Promise<AuthResponse> => {
  try {
    console.log('Sending Google token to backend for validation');
    
    const response = await fetch(GOOGLE_AUTH_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Authentication successful:', data);
      return { success: true, data };
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('Authentication failed:', response.status, errorData);
      return { success: false, error: 'Authentication failed' };
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    return { success: false, error: 'Network error during authentication' };
  }
};
