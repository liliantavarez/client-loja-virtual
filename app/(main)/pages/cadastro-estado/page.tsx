'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {DataTable, DataTableValueArray} from 'primereact/datatable';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Toast} from 'primereact/toast';
import {Toolbar} from 'primereact/toolbar';
import {buscarEstados, cadastrarEstado, editarEstado, removerEstado} from '../../services/estado/EstadoService';
import {Estado} from '../../interface/Estado';
import {classNames} from "primereact/utils";

const CadastroProduto = () => {
    const estadoNovo: Estado = {
        nome: '',
        sigla: '',
    };

    const [estados, setEstados] = useState<Estado[]>([]);
    const [estadosDialog, setEstadosDialog] = useState(false);
    const [deletarEstadoDialog, setDeletarEstadoDialog] = useState(false);
    const [estado, setEstado] = useState<Estado>(estadoNovo);
    const [enviar, setEnviar] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<DataTableValueArray>>(null)

    useEffect(() => {
        if (estados.length === 0) {
            fetchEstados();
        }
    }, [estados]);

    const fetchEstados = () => {
        buscarEstados()
            .then((data) => setEstados(data.data))
            .catch((error) => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro!',
                    detail: 'Erro ao buscar estados' + error.response.data,
                    life: 3000,
                });
            });
    };

    const abrirModelCadastroEvento = () => {
        setEstado(estadoNovo);
        setEnviar(false);
        setEstadosDialog(true);
    };

    const fecharDialog = () => {
        setEnviar(false);
        setEstadosDialog(false);
    };

    const fecharDeletarEstadoDialog = () => {
        setDeletarEstadoDialog(false);
    };

    const salvarEstado = () => {
        setEnviar(true);

        if (estado.nome.trim() && estado.sigla.trim()) {
            const dadosEstado = {...estado};

            if (estado.id) {
                editarEstado(estado.id, dadosEstado)
                    .then(() => {
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Bem Sucedido',
                            detail: 'Estado atualizado',
                            life: 3000,
                        });
                        fetchEstados();
                        setEstadosDialog(false);
                    })
                    .catch((error) => {
                        toast.current?.show({
                            severity: 'error',
                            summary: 'Erro!',
                            detail: 'Erro ao atualizar o dados do estado' + error.response.data,
                            life: 3000,
                        });
                    });
            } else {
                cadastrarEstado(dadosEstado)
                    .then(() => {
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Bem Sucedido',
                            detail: 'Estado criado',
                            life: 3000,
                        });
                        fetchEstados();
                        setEstadosDialog(false);
                    })
                    .catch((error) => {
                        toast.current?.show({
                            severity: 'error',
                            summary: 'Erro!',
                            detail: 'Erro ao cadastrar estado' + error.response.data,
                            life: 3000,
                        });
                    });
            }
            setEstado(estadoNovo);
        }
    };

    const editarEstadoItem = (estado: Estado) => {
        setEstado({...estado});
        salvarEstado();
        setEstadosDialog(true);
    };


    const confirmarDeletarEstado = (estado: Estado) => {
        setEstado(estado);
        deletarEstado();
        setDeletarEstadoDialog(true);
    };

    const deletarEstado = () => {
        if (!estado.id) return;

        removerEstado(estado.id)
            .then(() => {
                toast.current?.show({
                    severity: 'success',
                    summary: 'Bem Sucedido',
                    detail: 'Estado excluído',
                    life: 3000,
                });
                fetchEstados();
                setDeletarEstadoDialog(false);
            })
            .catch((error) => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro!',
                    detail: 'Erro ao remover estado' + error.response.data,
                    life: 3000,
                });
            });
    };

    const onInputChangeNome = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = e.target?.value || '';
        const updatedEstado = {...estado, nome: val};
        setEstado(updatedEstado);
    };

    const onInputChangeSigla = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = e.target?.value || '';
        const updatedEstado = {...estado, sigla: val};
        setEstado(updatedEstado);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="my-2">
                <Button label="Novo" icon="pi pi-plus" severity="success" className="mr-2"
                        onClick={abrirModelCadastroEvento}/>
            </div>
        );
    };

    const nomeBodyTemplate = (rowData: Estado) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.nome}
            </>
        );
    };

    const siglaBodyTemplate = (rowData: Estado) => {
        return (
            <>
                <span className="p-column-title">Sigla</span>
                {rowData.sigla.toUpperCase()}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Estado) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"
                        onClick={() => editarEstadoItem(rowData)}/>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmarDeletarEstado(rowData)}/>
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciar Estados</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search"/>
        <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Buscar..."/>
      </span>
        </div>
    );

    const estadoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={fecharDialog}/>
            <Button label="Salvar" icon="pi pi-check" text onClick={salvarEstado}/>
        </>
    );

    const deletarEstadoDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={fecharDeletarEstadoDialog}/>
            <Button label="Sim" icon="pi pi-check" value={estado.id} text onClick={deletarEstado}/>
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast}/>
                    <Toolbar className="mb-4" left={leftToolbarTemplate}/>

                    <DataTable
                        ref={dt}
                        value={estados}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum estado encontrado."
                        header={header}
                    >
                        <Column field="nome" header="Nome" sortable body={nomeBodyTemplate}
                                headerStyle={{minWidth: '15rem'}}></Column>
                        <Column field="sigla" header="Sigla" sortable body={siglaBodyTemplate}
                                headerStyle={{minWidth: '15rem'}}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{minWidth: '10rem'}}></Column>
                    </DataTable>

                    <Dialog
                        visible={estadosDialog}
                        style={{width: '450px'}}
                        header="Detalhes do Estado"
                        modal
                        className="p-fluid"
                        footer={estadoDialogFooter}
                        onHide={fecharDialog}
                    >
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText
                                id="nome"
                                minLength={4}
                                maxLength={20}
                                value={estado.nome}
                                onChange={(e) => onInputChangeNome(e)}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': enviar && !estado.nome,
                                })}
                            />
                            {enviar && !estado.nome && <small className="p-invalid">O nome é obrigatório.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="sigla">Sigla</label>
                            <InputText
                                id="sigla"
                                maxLength={2}
                                minLength={2}
                                value={estado.sigla.toUpperCase()}
                                onChange={(e) => onInputChangeSigla(e)}
                                required
                                className={classNames({
                                    'p-invalid': enviar && !estado.sigla,
                                })}
                            />
                            {enviar && !estado.sigla && <small className="p-invalid">A sigla é obrigatória.</small>}
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deletarEstadoDialog}
                        style={{width: '450px'}}
                        header="Confirmar"
                        modal
                        footer={deletarEstadoDialogFooter}
                        onHide={fecharDeletarEstadoDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                            {estado && (
                                <span>
                  Tem certeza de que deseja excluir <b>{estado.nome}</b>?
                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default CadastroProduto;
