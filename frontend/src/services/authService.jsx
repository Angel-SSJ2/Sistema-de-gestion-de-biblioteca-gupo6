const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTAwMSIsImVtYWlsIjoiYWRtaW5AYmlibGlvdGVjYS5jb20iLCJyb2xlIjoiQURNSU5fUk9MRSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFETUlOX1JPTEUiLCJpYXQiOjE3ODQwNTE2ODcsImV4cCI6MTc4NDA4MDQ4NywiYXVkIjoiQmlibGlvdGVjYUF1dGhTZXJ2aWNlIiwiaXNzIjoiQmlibGlvdGVjYUF1dGhTZXJ2aWNlIn0.ifC--qNpN7jI4zW3cU93DtnxuXupjz1Ta19t6kpx-qk';

export const loginMock = async (email, password) => {
  if (email === 'admin@biblioteca.com' && password === '123456') {
    return { token: VALID_TOKEN, user: { name: 'Administrador', email } };
  }
  throw new Error('Usuario o contraseña incorrectos (Prueba: admin@biblioteca.com / 123456)');
};

export const registerMock = async (name, email, password) => {
  return { message: 'Usuario registrado con éxito' };
};
