import FileStore from "./file";
import PatrolStore from "./patrol";
import AMap from "./aMap";
import Dict from "./dict";

class RootStore {
  constructor() {
    this.fileStore = new FileStore(this);
    this.patrolStore = new PatrolStore(this);
    this.aMapStore = new AMap(this);
    this.dict = new Dict(this);
  }
  userId = "test";
}

export default RootStore;
