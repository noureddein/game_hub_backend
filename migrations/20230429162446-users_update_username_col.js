"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return Promise.all([
            queryInterface.changeColumn("Users", "username", {
                type: new DataTypes.STRING(128),
                unique: true,
            }),
        ]);
    },

    async down(queryInterface, Sequelize) {
        return Promise.all([queryInterface.changeColumn("Users", "username")]);
    },
};
