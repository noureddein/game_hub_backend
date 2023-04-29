"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                type: new DataTypes.INTEGER(),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: new DataTypes.STRING(128),
                allowNull: false,
                unique: false,
            },
            first_name: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            last_name: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            email: {
                type: new DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
            password: {
                type: new DataTypes.STRING(256),
                allowNull: false,
            },
            is_active: {
                type: new DataTypes.BOOLEAN(),
                defaultValue: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
