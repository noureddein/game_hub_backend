const model = {
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
};

const { DB_HOST, DB_NAME, DB_USER, DB_PORT, DB_DIALECT, DB_PASSWORD } =
    process.env;
const sequelizeUri = `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const dbConfig = {
    development: {
        sequelizeUri,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    },
};

export const database: ClientConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
};

const user = [
    {
        id: 1,
        first_name: "Nour Eddein",
        last_name: "Al Abbassi",
        username: "noureddein",
        password: "12345678",
        email: "noureddein@gmail.com",
    },
    {
        id: 2,
        first_name: "Abbdullah",
        last_name: "Al Abbassi",
        username: "abdabb",
        password: "12345678",
        email: "abd@gmail.com",
    },
];

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init(
        {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
