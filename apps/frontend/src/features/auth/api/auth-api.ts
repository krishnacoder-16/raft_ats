export const authApi = {
  login: async (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: "mock_jwt_token",
          user: {
            id: "u-123",
            name: "Alex Admin",
            email: data.email,
            role: "admin",
          }
        });
      }, 1000);
    });
  },
};
