import {getConnection} from "../database/database";
import bcrypt from "bcryptjs"
import usersHandleError from "../handleErrors/users.handleerror";
import config from "../config";
import jwt from "jsonwebtoken";

const login = async(request, response) => {
    try {
        const {email, password} = request.body;
        const connection = await getConnection();
        const result = await connection.query("select * from usuarios where email = ?",email);
        if(result){
            if(bcrypt.compareSync(password,result[0].password)){
                const data = {
                    id: result[0].id,
                    nombre: result[0].nombre
                };
                const payload = {
                    check:true
                };
                const token = jwt.sign({
                    payload,
                    data: data
                }, config.secret_key, { expiresIn: '1h' });
                response.json({
                    status: 201,
                    message: "logged in session successful",
                    token: token
                });
            }else{
                response.json({
                    status: 401,
                    message: "No autorizado, password erronea"
                });
            }
        }else{
            response.json({
                status: 401,
                message: "No autorizado, email no registrado."
            });
        }
    } catch (error) {
        usersHandleError.userError(response,error);
    }
}

export const method = {
    login
}