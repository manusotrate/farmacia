"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const menuItems = [
  { label: "Frente de caixa", key: "frente", path: "/frentecaixa" },
  { label: "Medicamentos", key: "medicamentos", path: "/medicamentos" },
  { label: "Receitas", key: "receitas", path: "/receitas" },
  { label: "Médicos", key: "medicos", path: "/medicos" },
  { label: "UBS", key: "ubs", path: "/ubs" },
  { label: "Relatórios", key: "relatorios", path: "/relatorios" },
];

const pendencias = [
  { id: 1, nome: "Loratadina", dose: "10mg" },
  { id: 2, nome: "Dipirona", dose: "1g" },
  { id: 3, nome: "Ibuprofeno", dose: "100mg" },
];

export default function MedPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [composicao, setComposicao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [status, setStatus] = useState("");

  const handleConfirmar = () => {
    if (!nome || !composicao || !quantidade || !status) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    alert(`Remédio "${nome}" cadastrado com sucesso!`);
    setNome("");
    setComposicao("");
    setQuantidade("");
    setStatus("");
  };

  return (
    <div className="wrapper">
      {/* Header */}
      <header className="header">
        <Image src="/logo.png" alt="Farmácia Sálvia" width={180} height={52} priority />
      </header>

      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`menu-item ${item.key === "medicamentos" ? "menu-item-active" : ""}`}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="content">
          <div className="panels">
            {/* Cadastro */}
            <div className="card cadastro-card">
              <h2 className="card-title">Cadastrar remedio</h2>

              <div className="field-row">
                <span className="field-icon">✏️</span>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Nome do remédio"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div className="divider" />

              <div className="field-row">
                <span className="field-icon">◈</span>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Composição"
                  value={composicao}
                  onChange={(e) => setComposicao(e.target.value)}
                />
              </div>
              <div className="divider" />

              <div className="field-row">
                <span className="field-icon">⇅</span>
                <input
                  className="field-input"
                  type="number"
                  placeholder="Quantidade"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </div>
              <div className="divider" />

              <div className="field-row">
                <span className="field-icon">∨</span>
                <select
                  className="field-input field-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" disabled>Status</option>
                  <option value="disponivel">Disponível</option>
                  <option value="indisponivel">Indisponível</option>
                  <option value="baixo_estoque">Baixo Estoque</option>
                </select>
              </div>
              <div className="divider" />

              <button className="confirm-btn" onClick={handleConfirmar}>
                Confirmar
              </button>
            </div>

            {/* Pendências */}
            <div className="card pendencias-card">
              <h2 className="card-title">Pendências</h2>
              <div className="pendencias-list">
                {pendencias.map((p) => (
                  <div key={p.id} className="pendencia-item">
                    <span className="pendencia-icon">⚠</span>
                    <div className="pendencia-info">
                      <span className="pendencia-nome">{p.nome}</span>
                      <span className="pendencia-dose">{p.dose}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        .wrapper {
          min-height: 100vh;
          background-color: #f0f0f0;
          font-family: Arial, Helvetica, sans-serif;
          display: flex;
          flex-direction: column;
        }

        .header {
          background-color: #ffffff;
          padding: 12px 24px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
        }



        .main-layout {
          display: flex;
          flex: 1;
        }

        .sidebar {
          width: 220px;
          background-color: #ffffff;
          border-right: 1px solid #e0e0e0;
          padding: 16px 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .menu-item {
          text-align: left;
          padding: 14px 24px;
          font-size: 14px;
          color: #333;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          margin: 0 8px;
          transition: background 0.15s;
        }

        .menu-item:hover {
          background-color: #e8f5e5;
        }

        .menu-item-active {
          background-color: #a8dba4;
          font-weight: 600;
          color: #1a1a1a;
        }

        .content {
          flex: 1;
          padding: 32px;
          overflow-y: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .panels {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          width: 100%;
          max-width: 900px;
        }

        .card {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 32px 28px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .cadastro-card {
          flex: 1;
        }

        .pendencias-card {
          width: 280px;
        }

        .card-title {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 28px 0;
        }

        .field-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 0;
        }

        .field-icon {
          font-size: 16px;
          color: #888;
          width: 20px;
          text-align: center;
          flex-shrink: 0;
        }

        .field-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          color: #333;
          background: transparent;
          padding: 4px 0;
        }

        .field-input::placeholder {
          color: #aaa;
        }

        .field-select {
          appearance: none;
          cursor: pointer;
        }

        .field-select option {
          color: #333;
        }

        .divider {
          height: 1px;
          background-color: #e8e8e8;
          margin: 4px 0;
        }

        .confirm-btn {
          margin-top: 32px;
          width: 60%;
          display: block;
          margin-left: auto;
          margin-right: auto;
          background-color: #ffffff;
          border: 1.5px solid #ccc;
          border-radius: 8px;
          padding: 12px;
          font-size: 15px;
          color: #333;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }

        .confirm-btn:hover {
          background-color: #f0f0f0;
          border-color: #aaa;
        }

        .pendencias-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pendencia-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: #f8f8f8;
          border-radius: 10px;
          padding: 12px 14px;
          border: 1px solid #efefef;
        }

        .pendencia-icon {
          font-size: 18px;
          color: #4a9e46;
        }

        .pendencia-info {
          display: flex;
          flex-direction: column;
        }

        .pendencia-nome {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .pendencia-dose {
          font-size: 12px;
          color: #888;
        }

        @media (max-width: 700px) {
          .panels {
            flex-direction: column;
          }
          .cadastro-card {
            max-width: 100%;
            width: 100%;
          }
          .pendencias-card {
            width: 100%;
          }
          .sidebar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}