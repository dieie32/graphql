import { RESTDataSource } from '@apollo/datasource-rest';

export class PhotosAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://jsonplaceholder.typicode.com/';
    }

    async getPhotos() {
        return await this.get('photos');
    }

    async getPhotoById(id: number) {
        return await this.get(`photos/${id}`);
    }

    async getPhotosByAlbumId(albumId: number) {
        return await this.get(`photos?albumId=${albumId}`)
    }

    async createPhoto(createPhotoInput: { title: string; url: string, thumbnailUrl: string }){
        return await this.post('photos', createPhotoInput as Record<string, any>)
    }

    async updatePhoto(id: number, updatePhotoInput: { title: string; url: string, thumbnailUrl: string  }) {
        return await this.put(`photos/${id}`, updatePhotoInput as Record<string, any>);
    }

    async deletePhoto(id: number)  {
        return await this.delete(`photos/${id}`);
    }
}
