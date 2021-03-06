const db = require('../utils/database.js');

module.exports = class UserRole {
    constructor(userRole) {
        this.id_rus = userRole.id_rol;
        this.id_rol = userRole.id_rol;
        this.id_usr = userRole.id_usr;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM role_user_rus');
    }
    
    static create(newUserRole) {
        return db.query('INSERT INTO role_user_rus(id_rol, id_usr) VALUES (?, ?)' , [newUserRole.id_rol, newUserRole.id_usr]);
    }

    static update(id, userRole) {
        userRole.id_rus = id;
        return db.query('UPDATE role_user_rus SET id_rol = ?, id_usr = ? WHERE id_rus = ?' , [userRole.id_rol, userRole.id_usr, userRole.id_rus]);
    }

    static delete(id) {
        return db.query('DELETE FROM role_user_rus WHERE id_rus = ?' , [id]);
    }
}