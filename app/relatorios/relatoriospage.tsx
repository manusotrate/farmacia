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

const opcoes = [
  { value: "", label: "Selecione uma opção" },
  { value: "medicamentos_disponiveis", label: "Medicamentos disponíveis" },
  { value: "estoque_baixo", label: "Medicamentos com estoque baixo" },
  { value: "receitas_mes", label: "Receitas do mês" },
  { value: "medicos_ativos", label: "Médicos ativos" },
  { value: "ubs_cadastradas", label: "UBS cadastradas" },
];

const mockRelatorio: Record<string, string> = {
  medicamentos_disponiveis:
    "Cloridrato de Sertralina 50mg — 40 unidades\nCloridrato de Sertralina 100mg — 20 unidades\nLoratadina 10mg — 80 unidades\nIbuprofeno 600mg — 55 unidades\nOmeprazol 20mg — 120 unidades",
  estoque_baixo:
    "Loratadina 10mg — 5 unidades ⚠\nDipirona 1g — 3 unidades ⚠\nIbuprofeno 100mg — 2 unidades ⚠\nAmoxicilina 500mg — 4 unidades ⚠\nAzitromicina 500mg — 1 unidade ⚠",
  receitas_mes:
    "Dr. Aldo de Souza — 12 receitas\nDra. Yasmin Nishimura — 9 receitas\nDr. Henrique Araújo — 7 receitas\nDra. Sandra Minin — 5 receitas\nDr. Mateus Pereira — 4 receitas",
  medicos_ativos:
    "Dr. Aldo de Souza — UBS Jardim Esperança\nDr. Henrique Araújo — UBS Alto Cafezal\nDra. Yasmin Nishimura — UBS Jardim Esperança\nDra. Sandra Minin — UBS Santa Antonieta\nDr. Júlio de Lima — UBS Nova Marília\nDr. Mateus Pereira — UBS Alto Cafezal",
  ubs_cadastradas:
    "UBS Jardim Esperança — Marília, SP\nUBS Alto Cafezal — Pompeia, SP\nUBS Campante — Quintana, SP\nUBS Tabajaras — Tupã, SP\nUBS Nova Marília — Herculândia, SP\nUBS Caingangs — Tupã, SP",
};

export default function RelatoriosPage() {
  const router = useRouter();
  const [opcao, setOpcao] = useState("");

  const resultado = opcao ? mockRelatorio[opcao] : "";

  return (
    <div className="wrapper">
      <header className="header">
        <Image src="/logo.png" alt="Farmácia Sálvia" width={180} height={52} priority />
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`menu-item ${item.key === "relatorios" ? "menu-item-active" : ""}`}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </button>
          ))}
        </aside>

        <main className="content">
          <div className="card">
            <h2 className="card-title">Relatorio</h2>

            <div className="stat-card">
              <span className="stat-label">Medicamentos totais</span>
              <span className="stat-value">720</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">Medicamentos com estoque baixo</span>
              <span className="stat-value">15</span>
            </div>

            <div className="select-wrapper">
              <select
                className="select-input"
                value={opcao}
                onChange={(e) => setOpcao(e.target.value)}
              >
                {opcoes.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.value === ""}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="select-arrow">⌄</span>
            </div>

            <div className="resultado-box">
              {resultado ? (
                resultado.split("\n").map((linha, i) => (
                  <p key={i} className="resultado-linha">{linha}</p>
                ))
              ) : null}
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
          background-color: #e8f5e5;
          font-weight: 600;
          color: #1a1a1a;
        }
        .content {
          flex: 1;
          padding: 32px;
          overflow-y: auto;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .card {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 36px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          width: 100%;
          max-width: 820px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .card-title {
          font-size: 26px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }
        .stat-card {
          border: 1.5px solid #e8e8e8;
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .stat-label {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .stat-value {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
        }
        .select-wrapper {
          position: relative;
        }
        .select-input {
          width: 100%;
          border: 1.5px solid #e0e0e0;
          border-radius: 10px;
          padding: 12px 40px 12px 16px;
          font-size: 14px;
          color: #555;
          background: #ffffff;
          outline: none;
          appearance: none;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .select-input:focus {
          border-color: #4a9e46;
        }
        .select-arrow {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          font-size: 18px;
          color: #555;
          line-height: 1;
        }
        .resultado-box {
          border: 1.5px solid #e8e8e8;
          border-radius: 12px;
          padding: 20px;
          min-height: 140px;
          background: #fafafa;
        }
        .resultado-linha {
          font-size: 14px;
          color: #333;
          margin: 0 0 8px 0;
          line-height: 1.5;
        }
        .resultado-linha:last-child {
          margin-bottom: 0;
        }
        @media (max-width: 600px) {
          .sidebar { display: none; }
        }
      `}</style>
    </div>
  );
}