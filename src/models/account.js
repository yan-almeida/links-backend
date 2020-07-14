module.exports = (sequelize, DataTypes) => {
    // apenas dados de usuario
    const Account = sequelize.define('Account', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        jwtVersion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    Account.associate = (models) => {
        // hasMany == 'recebe Muitos'
        Account.hasMany(models.Link, { foreignKey: 'accountId' })
    };
    Account.prototype.toJSON = function() {
        const values = {...this.get() }; // this se refere ao Account
        delete values.password;

        return values;
    }

    return Account;
};