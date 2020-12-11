import fs from "react-native-fs";
import { Platform } from "react-native";

const defaultDirectoryPath =
  Platform === "ios"
    ? fs.LibraryDirectoryPath
    : fs.ExternalStorageDirectoryPath;

let prefix = "djk_temp_form_";

const saveAsFile = (
  data,
  type = "form",
  name = Number(new Date()),
  bool = true
) => {
  let str;
  prefix = `djk_temp_${type}`;
  return new Promise((resolve, reject) => {
    try {
      str = JSON.stringify(data);
    } catch (e) {
      reject(e);
    }
    fs.readdir(defaultDirectoryPath)
      .then(list => {
        if (list.filter(v => prefix + name === v).length !== 0 && bool) {
          reject(`文件已存在: ${name}`);
        } else {
          fs.writeFile(defaultDirectoryPath + "/" + prefix + name, str)
            .then(() => {
              resolve(name);
            })
            .catch(e => {
              reject(e);
            });
        }
      })
      .catch(e => {
        reject(e);
      });
  });
};

const getAllFile = (type = "form") => {
  prefix = `djk_temp_${type}`;
  return new Promise((resolve, reject) => {
    fs.readdir(defaultDirectoryPath)
      .then(list => {
        resolve(list.filter(v => v.indexOf(prefix) !== -1));
      })
      .catch(e => {
        reject(e);
      });
  });
};

const getContent = (name, type = "form") => {
  prefix = `djk_temp_${type}`;
  return new Promise((resolve, reject) => {
    fs.readdir(defaultDirectoryPath).then(list => {
      if (list.filter(v => v === prefix + name || v === name).length === -1) {
        reject(`找不到该文件: ${name}`);
      } else {
        fs.readFile(
          name.indexOf(prefix) !== -1
            ? defaultDirectoryPath + "/" + name
            : defaultDirectoryPath + "/" + prefix + name
        )
          .then(str => {
            let data;
            try {
              data = JSON.parse(str);
              resolve(data);
            } catch (e) {
              reject(e);
            }
          })
          .catch(e => {
            reject(e);
          });
      }
    });
  });
};

const deleteFile = (name, type = "form") => {
  prefix = `djk_temp_${type}`;
  return new Promise((resolve, reject) => {
    fs.readdir(defaultDirectoryPath).then(list => {
      if (list.filter(v => v === prefix + name || v === name).length === -1) {
        reject(`找不到该文件: ${name}`);
      } else {
        fs.unlink(
          name.indexOf(prefix) !== -1
            ? defaultDirectoryPath + "/" + name
            : defaultDirectoryPath + "/" + prefix + name
        )
          .then(() => {
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      }
    });
  });
};

const clear = (type = "form") => {
  return getAllFile(type).then(files => {
    return Promise.all(files.map(v => deleteFile(type, v)));
  });
};

export { saveAsFile, getAllFile, getContent, deleteFile, clear };
