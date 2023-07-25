export const SERVER = {
  PORT: process.env.SERVER_PORT || 3000,
};

export const JWT = {
  SECRET: process.env.SECRET || 'secret',
};

export const MONGO = {
  URL:
    process.env.MONGO_URL ||
    'mongodb+srv://guest:guest@study.pivfxid.mongodb.net/?retryWrites=true&w=majority',
};
