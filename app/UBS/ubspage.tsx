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

const mockUBS = [
  { id: 1, nome: "UBS Jardim Esperança", cidade: "Marília - SP" },
  { id: 2, nome: "UBS Alto Cafezal", cidade: "Pompeia - SP" },
  { id: 3, nome: "UBS Campante", cidade: "Quintana - SP" },
  { id: 4, nome: "UBS Tabajaras", cidade: "Tupã - SP" },
  { id: 5, nome: "UBS Nova Marília", cidade: "Herculândia - SP" },
  { id: 6, nome: "UBS Caingangs", cidade: "Tupã - SP" },
];

export default function UBSPage() {
  const router = useRouter();
  const [filtro, setFiltro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novaCidade, setNovaCidade] = useState("");
  const [ubsList, setUbsList] = useState(mockUBS);

  const ubsFiltradas = ubsList.filter((u) =>
    u.cidade.toLowerCase().includes(filtro.toLowerCase()) ||
    u.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleAdicionar = () => {
    if (!novoNome || !novaCidade) {
      alert("Preencha nome e cidade.");
      return;
    }
    setUbsList([...ubsList, { id: Date.now(), nome: novoNome, cidade: novaCidade }]);
    setNovoNome("");
    setNovaCidade("");
    setShowModal(false);
  };

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
              className={`menu-item ${item.key === "ubs" ? "menu-item-active" : ""}`}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </button>
          ))}
        </aside>

        <main className="content">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">UBS cadastradas</h2>
              <button className="add-btn" onClick={() => setShowModal(true)}>
                + Adicionar
              </button>
            </div>

            <div className="filter-row">
              <span className="filter-icon">▽</span>
              <input
                className="filter-input"
                type="text"
                placeholder="Filtrar por cidade"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>

            <div className="ubs-grid">
              {ubsFiltradas.map((ubs) => (
                <div key={ubs.id} className="ubs-card">
                  <span className="ubs-nome">{ubs.nome}</span>
                  <span className="ubs-cidade">{ubs.cidade}</span>
                </div>
              ))}
            </div>
          </div>

          {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-title">Adicionar UBS</h3>
                <input
                  className="modal-input"
                  type="text"
                  placeholder="Nome da UBS"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                />
                <input
                  className="modal-input"
                  type="text"
                  placeholder="Cidade - UF"
                  value={novaCidade}
                  onChange={(e) => setNovaCidade(e.target.value)}
                />
                <div className="modal-btns">
                  <button className="modal-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                  <button className="modal-confirm" onClick={handleAdicionar}>Confirmar</button>
                </div>
              </div>
            </div>
          )}
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
        .card {
          background-color: #ffffff;
          border-radius: 16px;
          padding: 36px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          width: 100%;
          max-width: 820px;
        }
        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .card-title {
          font-size: 22px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }
        .add-btn {
          background: none;
          border: none;
          font-size: 15px;
          color: #333;
          cursor: pointer;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
          transition: background 0.15s;
        }
        .add-btn:hover {
          background-color: #e8f5e5;
        }
        .filter-row {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: #f5f5f5;
          border-radius: 10px;
          padding: 10px 16px;
          margin-bottom: 24px;
        }
        .filter-icon {
          font-size: 14px;
          color: #888;
        }
        .filter-input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          color: #333;
          width: 100%;
        }
        .filter-input::placeholder {
          color: #aaa;
        }
        .ubs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .ubs-card {
          border: 1.5px solid #e8e8e8;
          border-radius: 12px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .ubs-card:hover {
          border-color: #a8dba4;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        }
        .ubs-nome {
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .ubs-cidade {
          font-size: 13px;
          color: #777;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        .modal {
          background: #fff;
          border-radius: 16px;
          padding: 32px 28px;
          width: 360px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }
        .modal-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #1a1a1a;
        }
        .modal-input {
          border: 1.5px solid #ddd;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .modal-input:focus {
          border-color: #4a9e46;
        }
        .modal-btns {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }
        .modal-cancel {
          background: none;
          border: 1.5px solid #ddd;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .modal-cancel:hover {
          background: #f5f5f5;
        }
        .modal-confirm {
          background-color: #5a9e5a;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .modal-confirm:hover {
          background-color: #4a8e4a;
        }
        @media (max-width: 600px) {
          .sidebar { display: none; }
          .ubs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}