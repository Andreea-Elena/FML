const sequelize = require("../config/db");
const Sequelize = require("sequelize");
const UserDetails = require("../models/userDetails")(
  sequelize,
  Sequelize.DataTypes
);
const UserAuth = require("../models/userAuth")(sequelize, Sequelize.DataTypes);

const userAuth = {
  create: async (user) => {
    try {
      const result = await UserDetails.create(user);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getDetails: async (id1) => {
    try {
      const user = await UserDetails.findOne({
        where: {
          id: id1,
        },
      });
      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getDetailsByAuthId: async (id) => {
    try {
      const user = await UserDetails.findOne({
        where: {
          idUserAuth: id,
        },
      });
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },
  getDetailsByAuthUsername: async (username) => {
    try {
      const user = await UserAuth.findOne({
        where: {
          username: username,
        },
      }).then((response) => (this.res = response));
      const userDet = await UserDetails.findOne({
        where: {
          idUserAuth: user.id,
        },
      });
      return userDet;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateDetails: async (
    id1,
    firstName1,
    lastName1,
    email1,
    phone1,
    facebook1,
    profile1,
    job1,
    company1,
    group1,
    series1,
    specialisation1,
    promotion1
  ) => {
    try {
      const user = await UserDetails.update(
        {
          firstName: firstName1,
          lastName: lastName1,
          email: email1,
          phone: phone1,
          facebook: facebook1,
          profile: profile1,
          job: job1,
          company: company1,
          group: group1,
          series: series1,
          specialisation: specialisation1,
          promotion: promotion1,
        },
        {
          where: {
            id: id1,
          },
        }
      );
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },

  getAllUsers: async () => {
    try {
      const users = await UserDetails.findAll();
      return users;
    } catch (err) {
      throw new Error(err);
    }
  },
  getDetailsByEmail: async (email1) => {
    try {
      const user = await UserDetails.findOne({
        where: {
          email: email1,
        },
      });
      return user;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = userAuth;
