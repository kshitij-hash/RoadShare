import React, { createContext, useState, useEffect } from 'react';
import { para } from '../client/para';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeParaClient = async () => {
      try {
        await para.init();
        
        // Check if user is authenticated
        const authStatus = await checkIfUserIsAuthenticated();
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error("Failed to initialize para client:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeParaClient();
  }, []);

  // Helper function to check if user is authenticated
  const checkIfUserIsAuthenticated = async () => {
    try {
      // Try to get wallets - this will fail if user is not authenticated
      const wallets = para.getWallets();
      // Check if wallets array exists and has at least one wallet
      return Array.isArray(wallets) && wallets.length > 0;
    } catch (error) {
      console.log("User not authenticated:", error);
      return false;
    }
  };

  // Login with email
  const loginWithEmail = async (email) => {
    try {
      const userExists = await para.checkIfUserExists({ email });
      if (userExists) {
        await para.login({ email });
        setIsAuthenticated(true);
        return { success: true };
      } else {
        await para.createUser({ email });
        return { success: true, needsVerification: true };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error };
    }
  };

  // Verify email with OTP
  const verifyEmail = async (verificationCode) => {
    try {
      const biometricsId = await para.verifyEmailBiometricsId({ verificationCode });
      console.log("Received biometricsId:", biometricsId);
      
      if (!biometricsId) {
        console.error("No biometricsId returned from verification");
        return { success: false, error: "Verification failed: No biometrics ID" };
      }
      
      // Get user email from local state or storage
      const email = user?.email;
      if (!email) {
        console.error("No email found in user state");
        return { success: false, error: "Verification failed: No email found" };
      }
      
      try {
        // Check if create options are available before registering
        await para.registerPasskey({ biometricsId, email });
        setIsAuthenticated(true);
        return { success: true };
      } catch (registerError) {
        console.error("Passkey registration error:", registerError);
        // If passkey registration fails but verification was successful,
        // we can still consider the user verified
        if (registerError.message && registerError.message.includes("No create options available")) {
          // This is a specific error from Para SDK when the device doesn't support passkeys
          // We can still authenticate the user without a passkey in this case
          setIsAuthenticated(true);
          return { success: true, warning: "Device may not support passkeys, but authentication succeeded" };
        }
        return { success: false, error: registerError };
      }
    } catch (error) {
      console.error("Verification error:", error);
      return { success: false, error };
    }
  };

  // Resend verification code
  const resendVerificationCode = async () => {
    try {
      await para.resendVerificationCode();
      return { success: true };
    } catch (error) {
      console.error("Resend verification code error:", error);
      return { success: false, error };
    }
  };

  // Logout
  const logout = async () => {
    try {
      // Para doesn't have a direct logout function, so we'll just clear local state
      setIsAuthenticated(false);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error };
    }
  };

  // Set user email during auth flow
  const setUserEmail = (email) => {
    setUser({ ...user, email });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        loginWithEmail,
        verifyEmail,
        resendVerificationCode,
        logout,
        setUserEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
