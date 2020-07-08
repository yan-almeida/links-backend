module.exports = (sequelize, DataTypes) => {
    // apenas dados de usuario
    const Account = sequelize.define('Account', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Account.prototype.toJSON = function() {
        const values = {...this.get() }; // this se refere ao Account
        delete values.senha;

        return values;
    }

    return Account;
};