import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; // Importe o arquivo CSS para aplicar estilos
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

const ProfessoresList = () => {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [professorToDelete, setProfessorToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/professores/');
        setProfessores(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados dos professores:', error);
        setErrorMessage('Erro ao buscar dados dos professores. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProfessor = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/professores/${id}`);
      // Atualizar a lista de professores após a exclusão
      const response = await axios.get('http://localhost:8080/professores/');
      setProfessores(response.data);
      // Fechar o modal de confirmação após a exclusão
      setShowConfirmModal(false);
    } catch (error) {
      console.error('Erro ao deletar professor:', error);
    }
  };

  const openConfirmModal = (professor) => {
    setProfessorToDelete(professor);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div>
      <h1>Lista de Professores</h1>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      <div className="professores-list-container">
        <div className="button-container">
          <Link to="/CadastroProfessor" className="btn-cadastrar">
            <FontAwesomeIcon icon={faPlus} className="plus-icon" />
            Cadastrar Professor
          </Link>
        </div>
        <table className="alunos-table">
          <thead>
            <tr>
              <th className='nomeHeader'>Nome</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {professores.map((professor) => (
              <tr key={professor.idProfessor}>
                <td>{professor.nome}</td>
                <td className='table-icon'>
                  <Link to={`/FormAtualizacaoProfessor/${professor.idProfessor}`}>
                    <FontAwesomeIcon className='editIcon' icon={faPencilAlt} />
                  </Link>
                </td>
                <td className='table-icon'>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    onClick={() => openConfirmModal(professor)}
                    className="delete-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal de confirmação para deletar professor */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h1>ATENÇÃO</h1>
            <h2>Tem certeza que deseja deletar o professor {professorToDelete.nome}?</h2>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={() => handleDeleteProfessor(professorToDelete.idProfessor)}>Confirmar</button>
              <button className="cancel-button" onClick={closeConfirmModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessoresList;
