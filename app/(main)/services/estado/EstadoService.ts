import api from "../api";
import {EstadoRequest} from "../../interface/EstadoRequest";


export const buscarEstados = async () => {
    return await api.get(`/estado`);
};

export const cadastrarEstado = async (estado: EstadoRequest) => {
    return await api.post(`/estado`, estado);
};

export const editarEstado = async (id: number, estado: EstadoRequest) => {
    return await api.patch(`/estado/${id}`, estado);
};


export const removerEstado = async (id: number) => {
    return await api.delete(`/estado/${id}`);
}