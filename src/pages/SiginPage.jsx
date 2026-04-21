import React from "react";
import "./SiginPage.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoginUser } from "../app/features/loginSlice";

const SiginPage = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // 👈 Limpia el error al escribir
  };

  const validate = () => {
    const newErrors = {};
    if (!isLogin && !form.name.trim())
      newErrors.name = "El nombre es requerido";
    if (!form.email.trim()) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email inválido";
    if (!form.password) newErrors.password = "La contraseña es requerida";
    else if (form.password.length < 6)
      newErrors.password = "Mínimo 6 caracteres";
    if (!isLogin && form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    // Tu lógica de login o registro aquí
    setTimeout(() => {
      try {
        setLoading(false);
        dispatch(setIsLoginUser(true));
        navigate("/");
      } catch (error) {
        console.log("error en timeout:", error); // 👈 ¿Qué error aparece?
      }
    }, 1500);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">StoreAPP</div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Iniciar sesión
          </button>
          <button
            className={`auth-tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Registrarse
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-field">
              <label>Nombre completo</label>
              <input
                type="text"
                name="name"
                placeholder="Jorge Pérez"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="auth-error">{errors.name}</span>}
            </div>
          )}

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="auth-error">{errors.email}</span>}
          </div>

          <div className="auth-field">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <span className="auth-error">{errors.password}</span>
            )}
          </div>

          {!isLogin && (
            <div className="auth-field">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <span className="auth-error">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          {isLogin && (
            <div className="auth-forgot">
              <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
          )}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading
              ? "Cargando..."
              : isLogin
                ? "Iniciar sesión"
                : "Crear cuenta"}
          </button>
        </form>

        {/* Switch */}
        <p className="auth-switch">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          <button onClick={switchMode}>
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SiginPage;
