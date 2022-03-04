import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { FiPower } from "react-icons/fi";
import './style.css';
import api from "../../services/api";

export default function Profile() {
    const [mel, setMel] = useState([]);

    const history = useHistory('');

    const produtorId = localStorage.getItem('produtorId');
    const produtorName = localStorage.getItem('produtorName');
    
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: produtorId,
            }
        }).then(response => {
            setMel(response.data);
        })
    }, [produtorId]);

    async function handleShowMel(id) {
        try {
            await api.get(`mel/${id}`, {
                headers: {
                    Authorization: produtorId,
                }
            });
        } catch (err) {
            alert("Falha na operação")
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <span>Bem vindo, {produtorName}</span>

                <Link className="button" to="/honey/new">Cadastrar novo lote de mel</Link>
                <button onClick={handleLogout} type="button" size={18}>
                    sair
                </button>
            </header>

            <h1>Produtos cadastrados</h1>

            <ul>
                <strong>Tipo</strong>
                <strong>Fabricação</strong>
                <strong>Validade</strong>
                <strong>Unidades</strong>
                <strong>QRcode</strong>

                {mel.map(mel => (
                    <li key={mel.id}>
                        
                        <p>{mel.especializacao}</p>                      
                        <p>{mel.fabricacao}</p>
                        <p>{mel.validade}</p>
                        <p>{mel.unidades}</p>
                        <p>{mel.qrcode}</p>

                        <button onClick={() => handleShowMel(mel.id)} type="button" color="darkorange">
                            Detalhar
                        </button>
                    </li>
                ))}
            </ul>
        </div>  
    );
}