import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from 'react-router-dom';
import { Tab, Tabs,TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'

import api from "../../services/api";
import './style.css';

export default function NewHoney() {    
    const [id, setId] = useState('');
    const [produtor, setProdutor] = useState('');
    const [especializacao, setEspecializacao] = useState('');
    const [peso, setPeso] = useState('');
    const [fabricacao, setFabricacao] = useState('');
    const [validade, setValidade] = useState('');
    const [localizacao, setLocalizacao] = useState('');

    const history = useHistory();

    async function handleNewHoney(e) {
        e.priventDefault();

        const data = {
            id,
            producao_id,
            especializacao,
            peso,
            fabricacao,
            validade,
            localizacao,
        };

        try{
            await api.post('mel', data);
            alert("Produto registrado!")

            history.push('/honey/new');
        }catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }

    }

    async function handleNewProduction(e) {
        e.priventDefault();

        const data = {
            id,
            peso,
            data_coleta,
            localizacao,
            especializacao,
            qtd_colmeias,
            id_colmeias,
        };

        try{
            await api.post('mel', data);
            alert("Produto registrado!")

            history.push('/honey/new');
        }catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }

    }

    return (
        <div className="new-honey-container">
            <div className="content">
                <section>
                    <h1>Cadastrar novo mel</h1>
                    <p>Descreva as propriedades do seu mel!</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para home
                    </Link>

                </section>

                <Tabs>
                    <TabList>
                        <Tab>Produtos beneficiados</Tab>
                        <Tab>Produtos</Tab>
                    </TabList>

                    <TabPanel>
                        <form onSubmit={handleNewHoney}>
                            <input 
                                placeholder="Id"
                                value={id}
                                onChange={e => setId(e.target.value)}
                            />
                            
                            <input 
                                placeholder="ID da Producao"
                                value={producao_id}
                                onChange={e => setProdutor(e.target.value)}
                            />
                            
                            <input 
                                placeholder="Especialisação"
                                value={especializacao}
                                onChange={e => setEspecializacao(e.target.value)}
                            />
                            
                            <input 
                                placeholder="Peso"
                                value={peso}
                                onChange={e => setPeso(e.target.value)}
                            />
                            
                            <input 
                                placeholder="Data de fabricação"
                                value={fabricacao}
                                onChange={e => setFabricacao(e.target.value)}
                            />
                            
                            <input 
                                placeholder="Validade"
                                value={validade}
                                onChange={e => setValidade(e.target.value)}
                            />
                            
                            <input 
                                placeholder="Localização"
                                value={localizacao}
                                onChange={e => setLocalizacao(e.target.value)}
                            />

                            <button className="button" type="submit">Cadastrar</button>

                        </form>
                    </TabPanel>

                    <TabPanel>
                        <form onSubmit={handleNewProduction}>
                            <input 
                                 placeholder="Id"
                                value={id}
                                 onChange={e => setId(e.target.value)}
                            />
                                
                            <input 
                                 placeholder="Peso"
                                 value={produtor}
                                onChange={e => setProdutor(e.target.value)}
                            />
                                
                            <input 
                                placeholder="data/hora da coleta"
                                value={especializacao}
                                onChange={e => setEspecializacao(e.target.value)}
                            />
                                
                            <input 
                                placeholder="Localizacao"
                                value={peso}
                                 onChange={e => setPeso(e.target.value)}
                            />
                                
                            <input 
                                placeholder="Especializacao"
                                value={fabricacao}
                                onChange={e => setFabricacao(e.target.value)}
                            />
                                
                            <input 
                                placeholder="Numero de colmeias"
                                value={validade}
                                onChange={e => setValidade(e.target.value)}
                            />
                                
                            <input 
                                placeholder="id_colmeias"
                                value={localizacao}
                                onChange={e => setLocalizacao(e.target.value)}
                            />

                            <button className="button" type="submit">Cadastrar</button>

                         </form>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}