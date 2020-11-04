const { Model, DataTypes } = require('sequelize');

const sequelize = require('sequelize');

class OpenIdRememberMe extends Model {};
OpenIdRememberMe.init({
    userName: DataTypes.STRING,
}, {});

module.exports = OpenIdRememberMe;