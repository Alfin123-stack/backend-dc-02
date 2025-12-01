import NodeCache from "node-cache";

// TTL = 24 jam (86400 detik)
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

export default cache;
