import api from "../api";
import {EstadoRequest} from "../../interface/EstadoRequest";


export const buscarEstados = async () => {
    return await api.get(`estados`);
};

export const cadastrarEstado = async (estado: EstadoRequest) => {
    return await api.post(`estados`, estado);
};

export const editarEstado = async (id: number, estado: EstadoRequest) => {
    return await api.patch(`estados/${id}`, estado);
};


export const removerEstado = async (id: number) => {
    return await api.delete(`estados/${id}`);
}