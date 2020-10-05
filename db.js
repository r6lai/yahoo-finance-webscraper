//name of database is yahooStock

const typeorm = require('typeorm');

class Stock {
    constructor(id, name, price, change, volume, cap) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.change = change;
        this.volume = volume;
        this.cap = cap;
    }
}

const EntitySchema = require("typeorm").EntitySchema;

const StockSchema = new EntitySchema({
    name: "Stock",
    target: Stock,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        price: {
            type: "text"
        },
        change: {
            type: "text"
        },
        volume: {
            type: "text"
        },
        cap: {
            type: "text"
        }
    }
});

async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "password",
        database: "yahooStock",
        synchronize: true,
        logging: false,
        entities: [
            StockSchema
        ]        
    })
}

async function getAllStocks() {
    const connection = await getConnection();
    const stockRepo = connection.getRepository(Stock);
    const stocks = await stockRepo.find();
    connection.close();
    return stocks;
}

async function insertStock(name, price, change, volume, cap) {
    const connection = await getConnection();
    
    //create
    const stock = new Stock();
    stock.name = name;
    stock.price = price;
    stock.change = change;
    stock.volume = volume;
    stock.cap = cap;

    //save
    const stockRepo = connection.getRepository(Stock);
    const res = await stockRepo.save(stock);
    console.log('saved', res);

    //return new list
    const allStocks = await stockRepo.find();
    connection.close();
    return allStocks;
}

module.exports = {
    getAllStocks,
    insertStock
}