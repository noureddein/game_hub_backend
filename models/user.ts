"use strict";

import { Model } from "sequelize";

interface UserAttributes {
    id: number;
    username: string;
    first_name: string
    last_name:string
    email: string;
    password: string;
    is_active:boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes> implements UserAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        id!: number;
        username!: string;
        first_name!: string;
        last_name!:string;
        email!: string;
        password!: string;
        is_active!:boolean;

        static associate(models: any) {
            // User.belongsToMany(models.Project, {
            //     through: "ProjectAssignments",
            // });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: false,
            },
            first_name: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            is_active: {
                type: DataTypes.BOOLEAN(),
                defaultValue: true,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};

