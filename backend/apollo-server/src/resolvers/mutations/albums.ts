const createAlbum = (album, { createAlbumInput }, { dataSources }, info) => {
    return { id: '101', ...createAlbumInput };
};

const updateAlbum = (album, { id, updateAlbumInput }, { dataSources }, info) => {
    return dataSources.albumsAPI.updateAlbum(id, updateAlbumInput);
};

const deleteAlbum = (album, { id }, { dataSources }, info) => {
    return dataSources.albumsAPI.deleteAlbum(id);
};

export { createAlbum, updateAlbum, deleteAlbum };
