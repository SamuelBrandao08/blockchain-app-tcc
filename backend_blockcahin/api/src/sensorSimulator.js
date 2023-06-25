const express = require("express");
const api = require("./colonymon-api");
const { PrismaClient } = require("@prisma/client");
const { users } = require("./usersLogin.json");

const prisma = new PrismaClient();

function main() {
  // while (true) {}
  const users = getUsers();
  const apiaries = getApiariesByUser(users);
}

function getHivesByUser(users, apiaries) {}

function getApiariesByUser(users) {
  console.log(users);
  //const apiaries = [];
  users.forEach(async (user) => {
    const response = await api.get("/apiries/", {
      headers: {
        Authorization: `${user.token}`,
      },
    });
    apiaries.push(response);
  });
  return apiaries;
}

const { login, apiary } = users.forEach(({ login, apiary }) => {
  return { login, apiary };
});
function update() {
  login.forEach((login) => {
    console.log(login);
    api.get("/sessions/", login).then((users) => {
      users.forEach((user) => {
        api
          .get(`/hives/${apiary}`, {
            headers: {
              Authorization: `${user.token}`,
            },
          })
          .then((hives) => {
            hives.forEach((hive) => {
              api.update(`/samples/1`, data, {
                headers: {
                  Authorization: `${user.token}`,
                },
              });
            });
          });
      });
    });
  });
}

module.exports = { hives };
