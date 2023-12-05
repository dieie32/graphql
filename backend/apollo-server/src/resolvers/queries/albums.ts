const albums = (albums, args, { dataSources }) => {
    return dataSources.albumsAPI.getAlbums()
};

const album = (albums, args, { dataSources }) => {
    return dataSources.albumsAPI.getAlbumById(args.id)
};

export { albums, album };
