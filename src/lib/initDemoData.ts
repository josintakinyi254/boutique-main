// Initialize demo admin user if not exists
export const initDemoData = () => {
  const users = JSON.parse(localStorage.getItem("elegante_users") || "[]");
  
  // Check if demo admin already exists
  const adminExists = users.find((u: any) => u.email === "admin@elegante.com");
  
  if (!adminExists) {
    const demoAdmin = {
      id: "demo-admin",
      email: "admin@elegante.com",
      name: "Admin User",
      role: "admin",
      password: "admin123", // Demo only - never do this in production!
    };
    
    users.push(demoAdmin);
    localStorage.setItem("elegante_users", JSON.stringify(users));
  }
};
