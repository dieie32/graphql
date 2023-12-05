const photos = (albums, args, { dataSources }) => {
    return dataSources.photosAPI.getPhotos()
};

const photo = (albums, args, { dataSources }) => {
    return dataSources.photosAPI.getPhotoById(args.id)
};

const photosInAlbum = (albums, args, { dataSources }) => {
    return dataSources.photosAPI.getPhotosByAlbumId(args.albumId)
};

export { photos, photo, photosInAlbum };
