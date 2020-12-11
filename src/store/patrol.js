import { getAllFile, getContent } from "../script/FormPreserver";

class Patrol {
  id;

  itemInfo;

  setId(id) {
    this.id = id;
  }

  setItemInfo(info) {
    this.itemInfo = info;
  }

  getLocalListById(id = this.id) {
    return getAllFile()
      .then((names) => {
        return Promise.all(names.map((name) => getContent(name)));
      })
      .then((datas) => {
        return datas.filter((v) => v.patrolRecId === id);
      });
  }
}

export default Patrol;
