import { useAuthStore } from '../store/auth-store';

export function useAuth() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuthStore();

  const hasRole = (roles: string[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
  };
}
