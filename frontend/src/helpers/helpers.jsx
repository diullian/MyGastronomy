import { redirect, useNavigate } from "react-router-dom";

// Para rotas que PRECISAM de autenticação
export const requireAuth = ({ request }) => {
  const auth = localStorage.getItem("auth");
  if (!auth) {
    const url = new URL(request.url);
    return redirect(`/auth?redirectTo=${url.pathname}`);
  }
  return null;
};

// Para rotas que NÃO podem ser acessadas autenticado (login/registro)
export const requireGuest = () => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    return redirect("/profile");
  }
  return null;
};

// Helper para verificar se está autenticado (usar nos componentes)
export const isAuthenticated = () => {
  return !!localStorage.getItem("auth");
};

// Helper para logout (reutilizável)
export const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem("auth");
    navigate("/auth", { replace: true });
  };
};
