'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('email_messages', {
      id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      campaign_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'campaigns',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      recipient: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      // superseded by 20221009141317-change-json-to-jsonb-everywhere.js
      params: {
        type: Sequelize.DataTypes.JSON,
        allowNull: true,
      },
      message_id: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      error_code: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: Sequelize.DataTypes.ENUM(
          'SENDING',
          'ERROR',
          'SUCCESS',
          'INVALID_RECIPIENT'
        ),
        allowNull: true,
      },
      dequeued_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      sent_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      delivered_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      received_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, _) => {
    await queryInterface.dropTable('email_messages')
  },
}
