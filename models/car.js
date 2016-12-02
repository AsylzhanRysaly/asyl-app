module.exports = function(sequelize, DataTypes) {
	return sequelize.define('car', {
		mark: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		year: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		fuel: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		volume: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		}
		
	});
};
