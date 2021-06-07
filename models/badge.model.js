const db = require('../utils/database.js');

module.exports = class Badge {
    constructor(badge) {
        this.id_bab = badge.id_bab;
        this.bab_name = badge.bab_name;
        this.bab_description = badge.bab_description;
        this.bab_image = badge.bab_image;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM badge_bab');
    }

    static create(newBadge) {
        const {
            bab_name,
            bab_description,
            bab_image
        } = newBadge

        return db.query('INSERT INTO badge_bab(bab_name,bab_description,bab_image) VALUES (?, ?,?)', [
            bab_name,
            bab_description,
            bab_image
        ]);
    }

    static update(id, badge) {
        const {
            bab_name, 
            bab_description
        } = badge;
        return db.query('UPDATE badge_bab SET bab_name = ?, bab_description = ? WHERE id_bab = ?', [
            bab_name,
            bab_description,
            Number(id)
        ]);
    }

    static delete(id) {
        return db.query('DELETE FROM badge_bab WHERE id_bab = ?' , [id]);
    }
}