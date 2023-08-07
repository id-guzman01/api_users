import {getConnection} from "../database/database"
import bcrypt from "bcryptjs";
import UsersHandleError from "../handleErrors/users.handleerror";

const getUsers = async (request, response) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("select * from usuarios");
        response.status(200).json({
            status: 200,
            result
        });
    } catch (error) {
        UsersHandleError.userError(response,error);
    }
}

const addUser = async (request,response) => {
    try {
        const { nombre, telefono, password, email } = request.body;
        const connection = await getConnection();
        const password_bcrypt = await bcrypt.hash(password,10);
        await connection.query("insert into usuarios (nombre, telefono, password, email) value (?,?,?,?)",[nombre,telefono,password_bcrypt,email]);
        response.json({
            status: 200,
            message: "user added susseful"
        });
    } catch (error) {
        UsersHandleError.userError(response,error);
    }
}

const getUser = async (request, response) => {
    try {
        const {id} = request.params;
        const connection = await getConnection();
        const result = await connection.query("select * from usuarios where id = ?",id);
        response.json({
            status: 200,
            result
        });
    } catch (error) {
        UsersHandleError.userError(response,error);
    }
}

const deleteUser = async (request, response) => {
    try {
        const {id} = request.params;
        const connection = await getConnection();
        const result = await connection.query("delete from usuarios where id = ?",id);
        response.json(result);
    } catch (error) {
        UsersHandleError.userError(response,error);
    }
};

const updateUser = async (request, response) => {
    try {
        const {id} = request.params;
        const {nombre, telefono, password, email} = request.body;
        const connection = await getConnection();
        const result = await connection.query("update usuarios set nombre = ?, telefono = ?, password = ?, email = ? where id = ?",[nombre, telefono, password, email, id]);
        response.json(result);
    } catch (error) {
        UsersHandleError.userError(response,error);
    }
};

export const method = {
    getUsers,
    addUser,
    getUser,
    deleteUser,
    updateUser
}