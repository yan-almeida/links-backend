'use strict';
// up: nvas alterações
// down: desfazer alterações

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.addColumn('accounts', 'jwtVersion', {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            after: 'password'
        });

    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.removeColumn('accounts', 'jwtVersion');
    }
};