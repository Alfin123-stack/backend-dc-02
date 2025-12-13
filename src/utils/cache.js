import NodeCache from "node-cache";

const quizCache = new NodeCache({
  stdTTL: 60 * 60,
  checkperiod: 120,
  useClones: false,
});

export default quizCache;
