const repo = require("../repositories/dbUserRepository");

const createUser = async (newUser) => {
    const dbUser = await repo.createUser(newUser);
    return mapUser(dbUser);
}

const getAllUsers = async () => {
    return await repo.getAll();
}

const getUserById = async (userId) => {
    const dbUser = await repo.getById(userId);
    return mapUser(dbUser);
}
const getRole = async (username) => {
    const dbUser = await repo.getByEmail(username);
    return dbUser.role;
}
const updateUser = async (id, update) => {
    const dbUser = await repo.updateUser(id, update);
    return mapUser(dbUser);
}

const deleteUser = async (id) => {
    const deletedUser = await repo.deleteUser(id)
    return mapUser(deletedUser);
}

const addToCart = async (userId, bookId) => {
    const dbUser = await repo.addToCart(userId, bookId);
    return mapUser(dbUser);
};

const removeFromCart = async (userId, bookId) => {
    const dbUser = await repo.removeFromCart(userId, bookId);
    return mapUser(dbUser);
};

const addFavourite = async (userId, bookId) => {
    const dbUser = await repo.addFavourite(userId, bookId);
    return mapUser(dbUser);
};

const removeFavourite = async (userId, bookId) => {
    const dbUser = await repo.removeFavourite(userId, bookId);
    return mapUser(dbUser);
};


const mapUser = (dbUser) => {
    return {
        id: dbUser._id,
        email: dbUser.email,
        role: dbUser.role,
        name: dbUser.name,
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getRole,
    addToCart,
    removeFromCart,
    addFavourite,
    removeFavourite
}
