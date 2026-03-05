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

export default function ReceitasPage() {
  const router = useRouter();
  const [medico, setMedico] = useState("");
  const [ubs, setUbs] = useState("");
  const [medicamentos, setMedicamentos] = useState("");

  const handleSalvar = () => {
    if (!medico || !ubs || !medicamentos) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    alert(`Receita do Dr(a). "${medico}" salva com sucesso!`);
    setMedico("");
    setUbs("");
    setMedicamentos("");
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
              className={`menu-item ${item.key === "receitas" ? "menu-item-active" : ""}`}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="content">
          <div className="card">
            <h2 className="card-title">Adicionar receita</h2>

            {/* Nome do médico + UBS lado a lado */}
            <div className="fields-row">
              <div className="field-row">
                <span className="field-icon">✏️</span>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Nome do médico"
                  value={medico}
                  onChange={(e) => setMedico(e.target.value)}
                />
              </div>
              <div className="divider-v" />
              <div className="field-row">
                <span className="field-icon">✏️</span>
                <input
                  className="field-input"
                  type="text"
                  placeholder="UBS"
                  value={ubs}
                  onChange={(e) => setUbs(e.target.value)}
                />
              </div>
            </div>
            <div className="divider" />

            {/* Textarea de medicamentos */}
            <textarea
              className="textarea"
              placeholder="Ex: Atenol 500mg"
              value={medicamentos}
              onChange={(e) => setMedicamentos(e.target.value)}
              rows={9}
            />

            <button className="save-btn" onClick={handleSalvar}>
              <span className="save-icon">⬇</span> Salvar
            </button>
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
          background-color: #e8f5e5;
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

        .card {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 48px 48px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          width: 100%;
          max-width: 820px;
        }

        .card-title {
          font-size: 22px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 28px 0;
        }

        .fields-row {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 4px;
        }

        .field-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          padding: 8px 0;
        }

        .field-icon {
          font-size: 15px;
          color: #888;
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
          border-bottom: 1.5px solid #ddd;
        }

        .field-input::placeholder {
          color: #aaa;
        }

        .divider-v {
          width: 1px;
          height: 32px;
          background-color: #e0e0e0;
          margin: 0 16px;
        }

        .divider {
          height: 1px;
          background-color: #e8e8e8;
          margin: 8px 0 20px;
        }

        .textarea {
          width: 100%;
          border: 1.5px solid #ddd;
          border-radius: 12px;
          padding: 16px;
          font-size: 14px;
          color: #333;
          background: #fafafa;
          outline: none;
          resize: vertical;
          font-family: Arial, Helvetica, sans-serif;
          box-sizing: border-box;
          transition: border-color 0.2s;
          margin-bottom: 24px;
        }

        .textarea:focus {
          border-color: #4a9e46;
        }

        .textarea::placeholder {
          color: #bbb;
        }

        .save-btn {
          width: 100%;
          background-color: #ffffff;
          border: 1.5px solid #ccc;
          border-radius: 10px;
          padding: 14px;
          font-size: 15px;
          color: #333;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.15s, border-color 0.15s;
        }

        .save-btn:hover {
          background-color: #f0f0f0;
          border-color: #aaa;
        }

        .save-icon {
          font-size: 16px;
        }

        @media (max-width: 600px) {
          .sidebar { display: none; }
          .fields-row { flex-direction: column; }
          .divider-v { display: none; }
        }
      `}</style>
    </div>
  );
}