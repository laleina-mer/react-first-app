import User from "../models/user.js";

export function findAllUsers() {
  return User.find();
}

export function findUsersByName(name) {
  return User.find({ name });
}

export function findUsersByJob(job) {
  return User.find({ job });
}

export function findUsersByNameAndJob(name, job) {
  return User.find({ name, job });
}

export function findUserById(id) {
  return User.findById(id);
}

export function createUser(obj) {
  return User.create(obj);
}

export function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}
