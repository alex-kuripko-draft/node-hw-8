import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

class Book extends Model {}

Book.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Book',
        tableName: 'books',
        timestamps: false,
    }
);

export default Book;