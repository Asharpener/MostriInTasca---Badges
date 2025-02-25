import * as SQLite from 'expo-sqlite';

export default class StorageManager {
    constructor() {
        // se esiste un db lo apro, altrimenti lo creo
        this.db = SQLite.openDatabase("MIT-DB")

        // crea le tabelle se non esistono
        this.createTableUtenti();
        this.createTableOggetti();
        this.createTableBadges();
    }

    //utenti

    async createTableUtenti() {
        const querySQL = "CREATE TABLE IF NOT EXISTS utenti (uid INTEGER PRIMARY KEY, name VARCHAR(100), picture TEXT, profileversion INTEGER)";
        const query = { args: [], sql: querySQL }
        const result = await this.db.execAsync([query], false)
        return result
    }

    // INSERT
    async insertUser(uid, name, picture, profileversion) {
        const querySQL = "INSERT INTO utenti (uid, name, picture, profileversion) VALUES (?, ?, ?, ?)";
        const query = { args: [uid, name, picture, profileversion], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        console.log(result);
        return result;
    }

    // UPDATE
    async updateUser(uid, name, picture, profileversion) {
        const querySQL = "UPDATE utenti SET name = ?, picture = ?, profileversion = ? WHERE uid = ?";
        const query = { args: [name, picture, profileversion, uid], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        console.log(result);
        return result;
    }

    // GETTERS
    async getAllUsers() {
        const querySQL = "SELECT * FROM utenti";
        const query = { args: [], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        //console.log(result[0].rows);
        return result[0].rows;
    }

    async getUserByID(uid) {
        const querySQL = "SELECT * FROM utenti WHERE uid = ?";
        const query = { args: [uid], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        //console.log("StorageManager // getUser - "+result[0].rows[0].uid);
        return result[0].rows;
    }

    //oggetti

    // Table create
    async createTableOggetti() {
        const querySQL = "CREATE TABLE IF NOT EXISTS oggetti (id INTEGER PRIMARY KEY, type VARCHAR(100), image TEXT, name VARCHAR(100), level INTEGER)";
        const query = { args: [], sql: querySQL }
        const result = await this.db.execAsync([query], false)
        return result
    }

    // INSERT
    async insertObject(id, type, image, name, level) {
        const querySQL = "INSERT INTO oggetti (id, type, image, name, level) VALUES (?, ?, ?, ?, ?)";
        const query = { args: [id, type, image, name, level], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        console.log(result);
        return result;
    }

    // GETTERS
    async getAllObjects() {
        const querySQL = "SELECT * FROM badges";
        const query = { args: [], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        //console.log(result[0].rows);
        return result[0].rows;
    }

    async getObjectByID(id) {
        const querySQL = "SELECT * FROM badges WHERE id = ?";
        const query = { args: [id], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        //console.log("StorageManager // getUser - "+result[0].rows[0].uid);
        return result[0].rows;
    }


    // ESAME GENNAIO BADGES
    
    async createTableBadges() {
        const querySQL = "CREATE TABLE IF NOT EXISTS badges (id INTEGER PRIMARY KEY, name VARCHAR(100), description VARCHAR(100), rarity INTEGER, image TEXT)";
        const query = { args: [], sql: querySQL }
        const result = await this.db.execAsync([query], false)
        return result;
    }

    async insertBadge(id, name, description, rarity, image) {
        const querySQL = "INSERT INTO badges (id, name, description, rarity, image) VALUES (?, ?, ?, ?, ?)";
        const query = { args: [id, name, description, rarity, image], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        console.log(result);
        return result;
    }

    async getBadgeById(id) {
        const querySQL = "SELECT * FROM oggetti WHERE id = ?";
        const query = { args: [id], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        return result[0]?.rows || [];
    }

    async getAllBadges() {
        const querySQL = "SELECT * FROM oggetti";
        const query = { args: [], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        return result[0]?.rows || [];
    }
    
    /* CODICE ESAME FEBBRAIO COLLECTED
    async createTableOggetti() {
        const querySQL = "CREATE TABLE IF NOT EXISTS oggetti (id INTEGER PRIMARY KEY, type VARCHAR(100), image TEXT, name VARCHAR(100), level INTEGER, collected BOOLEAN DEFAULT false)";
        const query = { args: [], sql: querySQL }
        const result = await this.db.execAsync([query], false)
        return result
    }
    
    // INSERT
    async toggleCollected(id) {
        const querySQL = "UPDATE oggetti SET collected = true WHERE id = ?";
        const query = { args: [id], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        console.log("febbraio toggle collected "+ id);
        return result;
    }

    */

    /* CODICE ESAME GIUGNO STAR
    async createTableOggetti() {
        const querySQL = "CREATE TABLE IF NOT EXISTS oggetti (id INTEGER PRIMARY KEY, type VARCHAR(100), image TEXT, name VARCHAR(100), level INTEGER, activated BOOLEAN DEFAULT false)";
        const query = { args: [], sql: querySQL }
        const result = await this.db.execAsync([query], false)
        return result
    }

    async toggleStar(id) {
        const querySQL = "UPDATE oggetti SET activated = true WHERE id = ?";
        const query = { args: [id], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        console.log("giugno toggle star "+ id);
        return result;
    }

    async getActivatedStars() {
        const querySQL = "SELECT * FROM oggetti WHERE type = 'star' AND activated = true";
        const query = { args: [], sql: querySQL };
        const result = await this.db.execAsync([query], false);
        //console.log(result[0].rows);
        return result[0].rows;
    }
    */
}