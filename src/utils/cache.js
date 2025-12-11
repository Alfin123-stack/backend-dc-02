// utils/cache.js
import NodeCache from "node-cache";

const quizCache = new NodeCache({
  stdTTL: 60 * 60, // TTL 1 jam
  checkperiod: 120,
  useClones: false, // BIAR OBJECT TIDAK DIKLON (supaya stabil)
});

export default quizCache;
