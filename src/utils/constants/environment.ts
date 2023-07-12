export const SERVER = {
  PORT: process.env.SERVER_PORT || 3000,
};

export const MONGO = {
  URL:
    process.env.MONGO_URL ||
    'mongodb+srv://soares:JHRDpGjV60iHJueZ@cluster.5if2c3x.mongodb.net/?retryWrites=true&w=majority',
};
