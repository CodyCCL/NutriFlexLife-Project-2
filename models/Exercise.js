const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Exercise extends Model {}

Exercise.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Sets: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'ExerciseSets',
                key: 'id',
            }
        },
        Name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Type:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        EntryDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        Calories: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        User: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Exercise'
    }
);

module.exports = Exercise;
