"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [funcao, setFuncao] = useState("");

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(formatCPF(e.target.value));
  };

  const handleSubmit = () => {
    if (!nome || !sobrenome || !cpf || !funcao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    router.push("/frentecaixa");
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Form Panel */}
        <div className="form-panel">
          <div className="form-row">
            <div className="field-group">
              <label className="field-label">Nome</label>
              <input
                className="field-input"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder=""
              />
            </div>
            <div className="field-group">
              <label className="field-label">Sobrenome</label>
              <input
                className="field-input"
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                placeholder=""
              />
            </div>
          </div>

          <div className="field-group full-width">
            <label className="field-label">CPF</label>
            <input
              className="field-input"
              type="text"
              value={cpf}
              onChange={handleCPF}
              placeholder="000.000.000-00"
              maxLength={14}
            />
          </div>

          <div className="field-group full-width">
            <label className="field-label">Função</label>
            <div className="select-wrapper">
              <select
                className="field-select"
                value={funcao}
                onChange={(e) => setFuncao(e.target.value)}
              >
                <option value="" disabled>
                  Selecione seu cargo
                </option>
                <option value="farmaceutico">Farmacêutico(a)</option>
                <option value="atendente">Atendente</option>
                <option value="gerente">Gerente</option>
                <option value="estoque">Estoque</option>
                <option value="caixa">Caixa</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>

          <button className="confirm-btn" onClick={handleSubmit}>
            CONFIRMAR
          </button>

          
        </div>

        {/* Welcome Panel */}
        <div className="welcome-panel">
          <h1 className="welcome-title">BEM VINDO!</h1>
          <p className="welcome-text">
            Preencha os seus dados para{" "}
            <strong>liberarmos o acesso :)</strong>
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-wrapper {
          min-height: 100vh;
          background-image: url('/background.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: Arial, Helvetica, sans-serif;
        }

        .login-container {
          display: flex;
          align-items: center;
          gap: 48px;
          z-index: 10;
          position: relative;
          padding: 24px;
          max-width: 860px;
          width: 100%;
        }

        .form-panel {
          background-color: #8AD87A;
          border-radius: 12px;
          padding: 48px 44px 40px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 460px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .form-row {
          display: flex;
          gap: 16px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .field-group.full-width {
          width: 100%;
        }

        .field-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #2d5a30;
        }

        .field-input {
          background-color: #c8edc5;
          border: none;
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          color: #2d5a30;
          outline: none;
          width: 100%;
          box-sizing: border-box;
          transition: background 0.2s;
        }

        .field-input:focus {
          background-color: #d8f5d5;
          box-shadow: 0 0 0 2px #4a9e46;
        }

        .field-input::placeholder {
          color: #8abf87;
        }

        .select-wrapper {
          position: relative;
        }

        .field-select {
          background-color: #c8edc5;
          border: none;
          border-radius: 12px;
          padding: 12px 40px 12px 14px;
          font-size: 14px;
          color: #2d5a30;
          outline: none;
          width: 100%;
          appearance: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .field-select:focus {
          background-color: #d8f5d5;
          box-shadow: 0 0 0 2px #4a9e46;
        }

        .select-arrow {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          font-size: 10px;
          color: #2d5a30;
        }

        .confirm-btn {
          background-color: #A0FF8C;
          color: white;
          border: none;
          border-radius: 14px;
          padding: 16px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.1em;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s, transform 0.1s;
        }

        .confirm-btn:hover {
          background-color: #4a8e4a;
          transform: translateY(-1px);
        }

        .confirm-btn:active {
          transform: translateY(0);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .logo-farmacia {
          font-size: 11px;
          font-weight: 400;
          color: #2d5a30;
          letter-spacing: 0.05em;
        }

        .logo-salvia {
          font-size: 16px;
          font-weight: 700;
          font-style: italic;
          color: #2d5a30;
          letter-spacing: 0.03em;
        }

        .logo-tagline {
          font-size: 7px;
          color: #4a7c59;
          letter-spacing: 0.08em;
          margin-top: 1px;
        }

        .welcome-panel {
          flex: 1;
          padding: 16px;
        }

        .welcome-title {
          font-size: 52px;
          font-weight: 900;
          color: #1a1a1a;
          line-height: 1;
          margin: 0 0 16px 0;
          letter-spacing: -0.01em;
        }

        .welcome-text {
          font-size: 22px;
          color: #2a2a2a;
          line-height: 1.4;
          margin: 0;
          max-width: 280px;
        }

        .welcome-text strong {
          font-weight: 800;
        }

        @media (max-width: 680px) {
          .login-container {
            flex-direction: column;
          }

          .form-panel {
            min-width: unset;
            width: 100%;
          }

          .welcome-title {
            font-size: 36px;
          }

          .welcome-text {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}