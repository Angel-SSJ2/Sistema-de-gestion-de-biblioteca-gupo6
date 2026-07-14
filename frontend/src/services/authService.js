// src/services/authService.js

// Cambia esto a true cuando el backend de Auth esté listo en su puerto (ej. http://localhost:3000)
const USE_REAL_BACKEND = false; 
const API_URL = "http://localhost:3000/auth"; // Puerto del backend de Auth

export const loginMock = async (email, password) => {
  if (USE_REAL_BACKEND) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Credenciales incorrectas");
    return await response.json();
  } {
    // SIMULACIÓN LOCAL PARA EL SPRINT 1
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@biblioteca.com" && password === "123456") {
          resolve({ token: "fake-jwt-token-12345", user: { name: "Administrador", email } });
        } else {
          reject(new Error("Usuario o contraseña incorrectos (Prueba con admin@biblioteca.com / 123456)"));
        }
      }, 800);
    });
  }
};

export const registerMock = async (name, email, password) => {
  if (USE_REAL_BACKEND) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return await response.json();
  } {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: "Usuario registrado con éxito en Mock" });
      }, 800);
    });
  }
};