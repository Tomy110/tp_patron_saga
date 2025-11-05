import { Producto } from '../types';

export const catalogoService = {
    productos: [
        {
            id: '1',
            name: 'Producto 1',
            price: 100,
            description: 'Descripcion del Producto 1',
            stock: 10
        },
        {
            id: '2',
            name: 'Producto 2',
            price: 200,
            description: 'Descripcion del Producto 2',
            stock: 20
        }
    ] as Producto[],

    getAll(): Promise<Producto[]> {
        return new Promise((resolve) => {
            resolve(this.productos);
        });
    },

    getById(id: string): Promise<Producto | null> { 
        return new Promise((resolve) => {
            const producto = this.productos.find(p => p.id === id) || null;
            resolve(producto);
        });
    }
};

export class CatalogoService {
    static async getAll(): Promise<Producto[]> {
        return catalogoService.getAll();
    }
    static async getById(id: string): Promise<Producto | null> {
        return catalogoService.getById(id);
    }
}
