import NodeCache from "node-cache";

class CacheSingleton {
	private static instance: NodeCache;

	private constructor() {}

	public static getInstance(): NodeCache {
		if (!CacheSingleton.instance) {
			CacheSingleton.instance = new NodeCache();
		}
		return CacheSingleton.instance;
	}
}

export default CacheSingleton.getInstance();
