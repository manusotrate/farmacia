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

const mockMedicamentos = [
  { id: 1, nome: "CLORIDRATO DE SERTRALINA", composicao: "Cloridrato de sertralina", unidade: "50mg", quantidade: 40, status: "Disponivel" },
  { id: 2, nome: "CLORIDRATO DE SERTRALINA", composicao: "Cloridrato de sertralina", unidade: "50mg", quantidade: 40, status: "Disponivel" },
  { id: 3, nome: "CLORIDRATO DE SERTRALINA", composicao: "Cloridrato de sertralina", unidade: "50mg", quantidade: 40, status: "Disponivel" },
  { id: 4, nome: "CLORIDRATO DE SERTRALINA", composicao: "Cloridrato de sertralina", unidade: "100mg", quantidade: 20, status: "Disponivel" },
  { id: 5, nome: "CLORIDRATO DE SERTRALINA", composicao: "Cloridrato de sertralina", unidade: "20mg", quantidade: 15, status: "Disponivel" },
  { id: 6, nome: "CLORIDRATO DE SERTRALINA", composicao: "Cloridrato de sertralina", unidade: "25mg", quantidade: 30, status: "Disponivel" },
];

export default function CaixaPage() {
  const router = useRouter();
  const [busca, setBusca] = useState("");

  const medicamentosFiltrados = mockMedicamentos.filter((m) =>
    m.nome.toLowerCase().includes(busca.toLowerCase()) ||
    m.composicao.toLowerCase().includes(busca.toLowerCase())
  );

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
              className={`menu-item ${item.key === "frente" ? "menu-item-active" : ""}`}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="content">
          <div className="search-wrapper">
           <span className="field-icon">
                 <img src="lupa.png" alt="editar" />
                </span>
            <input
              className="search-input"
              type="text"
              placeholder="Busque seu medicamento"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <div className="med-grid">
            {medicamentosFiltrados.map((med) => (
              <div key={med.id} className="med-card">
                <div className="med-img">
                 <img src="sertralina.png" alt="" />
                </div>
                <div className="med-info">
                  <h3 className="med-nome">{med.nome}</h3>
                  <p className="med-detail">Composição: {med.composicao}</p>
                  <p className="med-detail">Unidade de medida: {med.unidade}</p>
                  <p className="med-detail">Quantidade total: {med.quantidade}</p>
                  <p className="med-detail">Status: {med.status}</p>
                </div>
              </div>
            ))}
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
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
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
          font-size: 18px;
          font-weight: 700;
          font-style: italic;
          color: #2d5a30;
          letter-spacing: 0.03em;
        }
        .logo-tagline {
          font-size: 7px;
          color: #4a7c59;
          letter-spacing: 0.08em;
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
         {
          background-color: #e8f5e5;
          font-weight: 600;.menu-item-active
          color: #1a1a1a;
        }
        .content {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
        }
        .search-wrapper {
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border-radius: 24px;
          padding: 10px 20px;
          gap: 10px;
          margin-bottom: 24px;
          max-width: 100%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .search-icon {
          font-size: 16px;
          opacity: 0.5;
        }
        .search-input {
          border: none;
          outline: none;
          font-size: 14px;
          color: #333;
          width: 100%;
          background: transparent;
        }
        .med-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .med-card {
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
          transition: transform 0.15s, box-shadow 0.15s;
          cursor: pointer;
        }
        .med-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.12);
        }
        .med-img {
          background: #e8f5e5
          padding: 16px;
          display: flex;
          justify-content: center;
        }
        .med-img-inner {
          background: linear-gradient(to bottom, #4a9e46 0%, #2d7a2a 50%, #e8c020 50%, #e8c020 100%);
          border-radius: 8px;
          width: 100px;
          height: 120px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .pill-label {
          padding: 8px 8px 4px;
          flex: 1;
        }
        .pill-brand {
          display: block;
          font-size: 7px;
          color: #ffffff;
          font-style: italic;
        }
        .pill-name {
          display: block;
          font-size: 8px;
          color: #ffffff;
          font-weight: 700;
          line-height: 1.2;
          margin-top: 2px;
        }
        .pill-badge {
          background-color: #e8c020;
          padding: 6px 8px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .pill-g {
          font-size: 20px;
          font-weight: 900;
          color: #c0790a;
          line-height: 1;
        }
        .pill-generic {
          font-size: 6px;
          color: #c0790a;
          font-weight: 700;
          line-height: 1.3;
        }
        .med-info {
          padding: 12px 16px 16px;
        }
        .med-nome {
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }
        .med-detail {
          font-size: 12px;
          color: #555;
          margin: 2px 0;
          line-height: 1.4;
        }
        @media (max-width: 900px) {
          .med-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .sidebar { display: none; }
          .med-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}