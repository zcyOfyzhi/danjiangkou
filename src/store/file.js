import fs from "react-native-fs";
import RNFetchBlob from "react-native-fetch-blob";

class FileStore {
  fileUrl = "http://10.6.172.163:9201";

  uploadFile(filename, type, data, path) {
    let getBody = data
      ? () =>
          Promise.resolve([
            { name: "output", data: "json" },
            {
              name: "file",
              filename: filename,
              type: type,
              data: data,
            },
          ])
      : () =>
          fs.readFile(path, "base64").then((data) => [
            { name: "output", data: "json" },
            {
              name: "file",
              filename: filename,
              type: type,
              data: data,
            },
          ]);

    return getBody()
      .then((body) => {
        console.log(body);
        return RNFetchBlob.fetch(
          "POST",
          this.fileUrl + "/group1/upload",
          {
            "Content-Type": "multipart/form-data",
          },
          body
        );
      })
      .then((resp) => {
        try {
          return resp.json();
        } catch (e) {
          return resp.text();
        }
      });
  }

  covertToFileObjByPath(path, fileName, mime) {
    return fs
      .readFile(path, "base64")
      .then((data) => this.covertToFileObjByBase64(data, fileName, mime));
  }

  covertToFileObjByBase64(base64, fileName, mime) {
    return new Promise((resolve, reject) => {
      try {
        let [mimeType, blob] = base64.split(",");
        type = !blob ? mime : mimeType;
        blob = !blob ? mimeType : blob;

        let n = blob.length,
          uint8Arr = new Uint8Array(n);

        while (n--) {
          uint8Arr[n] = blob.charCodeAt(n);
        }
        resolve(new File([uint8Arr], fileName, { type }));
      } catch (e) {
        reject(e);
      }
    });
  }

  uploadFilesByBase64(arr) {
    return Promise.all(
      arr.map((v) => this.uploadFile(v.fileName, v.type, v.data))
    );
  }

  uploadFilesByPath(arr) {
    return Promise.all(
      arr.map((v) => this.uploadFile(v.fileName, v.type, undefined, v.path))
    );
  }
}

export default FileStore;
