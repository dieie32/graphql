const createPhoto = (photo, { createPhotoInput }, { dataSources }, info) => {
    return { id: '101', ...createPhotoInput };
};

const updatePhoto = (photo, { id, updatePhotoInput }, { dataSources }, info) => {
    return dataSources.photosAPI.updatePhoto(id, updatePhotoInput);
};

const deletePhoto = (photo, { id }, { dataSources }, info) => {
    return dataSources.photosAPI.deletePhoto(id);
};

export { createPhoto, updatePhoto, deletePhoto };