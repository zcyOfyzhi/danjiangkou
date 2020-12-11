import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ToastAndroid,
  Animated,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
import { observable, action, reaction, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { SwipeListView } from "react-native-swipe-list-view";
import ImageViewer from "react-native-image-zoom-viewer";

@inject("store")
@observer
class AttachmentUploader extends Component {
  constructor(props) {
    super(props);
    this.rowSwipeAnimatedValues = Object.assign(
      {},
      ...Array.from(
        { length: (this.props.initFileList || []).length },
        (v, i) => {
          return { [i]: new Animated.Value(0) };
        }
      )
    );
  }

  @observable modalShow = false;

  @observable images = [];

  @observable imageIndex = 0;

  @observable fileList = (this.props.initFileList || []).map((v, i) => {
    return {
      ...v,
      key: i
    };
  });

  initFileListWatcher = reaction(
    () => this.props.initFileList,
    () => {
      this.fileList = this.props.initFileList.map((v, i) => {
        return {
          ...v,
          key: i
        };
      });
    }
  );

  fileListLengthWatcher = reaction(
    () => this.fileList.length,
    () => {
      this.rowSwipeAnimatedValues = Object.assign(
        {},
        ...this.fileList.map((v, i) => {
          return {
            [i]: this.rowSwipeAnimatedValues[i] || new Animated.Value(0)
          };
        })
      );
    }
  );

  fileListWatcher = reaction(
    () => JSON.stringify(toJS(this.fileList)),
    val => {
      if (this.props.onChange) {
        this.props.onChange(JSON.parse(val));
      }
    }
  );

  getFileIcon(type) {
    switch (type) {
      case "pic":
        return <Icon name="file-photo-o" size={20} color="#52c41a" />;
      case "video":
        return <Icon name="film" color="#617bff" size={20} />;
      default:
        return <Icon name="file-o" size={20} color="#333" />;
    }
  }

  checkMutiple(file) {
    return !toJS(this.fileList).find(
      v =>
        v.name === file.name &&
        (v.data ? v.data === file.data : true) &&
        (v.path ? v.path === file.path : true) &&
        (v.fileSize ? v.fileSize === file.fileSize : true) &&
        (v.width ? v.width === file.width : true) &&
        (v.height ? v.height === file.height : true) &&
        (v.fileType ? v.fileType === file.fileType : true)
    );
  }

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  @action
  viewItem(rowMap, item) {
    const rowKey = item.key;

    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }

    // if (item.type && item.type == "pic") {
    //   this.images = [
    //     {
    //       url: "",
    //       width: item.width || 400,
    //       height: item.height || 300,
    //       props: {
    //         source: { uri: "data:image/png;base64," + item.data }
    //       }
    //     }
    //   ];

    //   this.modalShow = true;
    // } else if (item.url) {
    //   this.images = [
    //     {
    //       url: item.url,
    //       width: item.width || 400,
    //       height: item.height || 300,
    //       props: {
    //         source: { uri: this.props.store.fileStore.fileUrl + item.url }
    //       }
    //     }
    //   ];

    //   this.modalShow = true;
    // }
    // 修改查看图片  一次性加载所有图片 并定位到当前选定的图片
    this.images = toJS(this.fileList).map(v => {
      return {
        url: item.url || "",
        width: item.width || 400,
        height: item.height || 300,
        props: {
          source: {
            uri:
              item.type && item.type == "pic"
                ? "data:image/png;base64," + item.data
                : this.props.store.fileStore.fileUrl + item.url
          }
        }
      };
    });
    this.imageIndex = Math.max(
      toJS(this.fileList).findIndex(v =>
        v.url ? v.url === item.url : v.data === item.data
      ),
      0
    );
    this.modalShow = true;
  }

  deleteRow(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    const prevIndex = this.fileList.findIndex(item => item.key === rowKey);
    this.fileList.splice(prevIndex, 1);
  }

  onSwipeValueChange(swipeData) {
    const { key, value } = swipeData;
    if (this.rowSwipeAnimatedValues[key]) {
      this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    }
  }

  render() {
    return (
      <View style={style.container}>
        <Modal
          hardwareAccelerated={true}
          presentationStyle="overFullScreen"
          onRequestClose={() => {
            this.modalShow = false;
          }}
          visible={this.modalShow}
          transparent={true}
        >
          <ImageViewer
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0
            }}
            index={this.imageIndex}
            menus={() => null}
            imageUrls={toJS(this.images)}
          />
        </Modal>
        <View style={style.list}>
          <SwipeListView
            data={toJS(this.fileList)}
            renderItem={data => {
              return (
                <View style={style.containerStyle}>
                  {this.getFileIcon(data.item.type)}
                  <Text style={style.listItemText}>{data.item.name}</Text>
                </View>
              );
            }}
            renderHiddenItem={(data, rowMap) => {
              return (
                <View style={style.row}>
                  <View style={style.left}>
                    <TouchableOpacity
                      onPress={() => this.viewItem(rowMap, data.item)}
                    >
                      <Icon size={28} color="white" name="eye" />
                    </TouchableOpacity>
                  </View>
                  {!this.props.readonly && (
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={StyleSheet.flatten([
                          style.backRightBtn,
                          style.backRightBtnLeft
                        ])}
                        onPress={() => this.closeRow(rowMap, data.item.key)}
                      >
                        <Text style={{ color: "white" }}>取消</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={StyleSheet.flatten([
                          style.backRightBtn,
                          style.backRightBtnRight
                        ])}
                        onPress={() => this.deleteRow(rowMap, data.item.key)}
                      >
                        <Icon name="trash" size={28} color="white" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            }}
            leftOpenValue={60}
            stopLeftSwipe={90}
            disableLeftSwipe={this.props.readonly}
            rightOpenValue={-120}
            stopRightSwipe={-180}
            closeOnScroll={true}
            closeOnRowOpen={true}
            closeOnRowPress={true}
            closeOnRowBeginSwipe={true}
            keyExtractor={(item, index) => index.toString()}
            previewOpenValue={-30}
            previewOpenDelay={3000}
            onSwipeValueChange={swipeData => this.onSwipeValueChange(swipeData)}
          />
        </View>
        {!this.props.readonly && (
          <View style={style.iconPicker}>
            <Icon
              name="film"
              size={20}
              color="#666"
              onPress={() => {
                ImagePicker.showImagePicker(
                  {
                    title: "上传视频",
                    cancelButtonTitle: "取消",
                    takePhotoButtonTitle: null,
                    mediaType: "video",
                    videoQuality: "low",
                    chooseFromLibraryButtonTitle: "从本地",
                    storageOptions: {
                      skipBackup: true
                    }
                  },
                  response => {
                    if (response.didCancel) {
                      if (!Platform.ios) {
                        ToastAndroid.show("取消上传", ToastAndroid.SHORT);
                      }
                      return;
                    } else if (response.error) {
                      if (!Platform.ios) {
                        ToastAndroid.show(
                          "选择视频出错, 请稍后再试",
                          ToastAndroid.SHORT
                        );
                      }
                      return;
                    }

                    const {
                      fileName,
                      data,
                      path,
                      fileSize,
                      type,
                      width,
                      height
                    } = response;

                    const fileItem = {
                      name: fileName
                        ? fileName
                            .split(".")
                            .reverse()
                            .slice(1)
                            .reverse()
                            .join(".")
                        : undefined,
                      data,
                      path,
                      fileSize,
                      fileType: type,
                      type: "video",
                      width,
                      height,
                      key: toJS(this.fileList).length
                    };

                    if (this.checkMutiple(fileItem)) {
                      console.log("没有重复的文件， 准备添加");
                      this.fileList.push(fileItem);
                      console.log(toJS(this.fileList));
                    }
                  }
                );
              }}
            />
            <Icon
              name="file-photo-o"
              size={20}
              color="#666"
              onPress={() => {
                ImagePicker.showImagePicker(
                  {
                    title: "上传图片",
                    cancelButtonTitle: "取消",
                    takePhotoButtonTitle: "拍照",
                    mediaType: "photo",
                    quality: 0.8,
                    chooseFromLibraryButtonTitle: "从相册",
                    storageOptions: {
                      skipBackup: true
                    }
                  },
                  response => {
                    if (response.didCancel) {
                      if (!Platform.ios) {
                        ToastAndroid.show("取消上传", ToastAndroid.SHORT);
                      }
                      return;
                    } else if (response.error) {
                      if (!Platform.ios) {
                        ToastAndroid.show(
                          "选择图片出错, 请稍后再试",
                          ToastAndroid.SHORT
                        );
                      }
                      return;
                    }

                    const {
                      fileName,
                      data,
                      path,
                      fileSize,
                      type,
                      width,
                      height
                    } = response;

                    const fileItem = {
                      name: fileName
                        ? fileName
                            .split(".")
                            .reverse()
                            .slice(1)
                            .reverse()
                            .join(".")
                        : undefined,
                      data,
                      path,
                      fileSize,
                      fileType: type,
                      type: "pic",
                      width,
                      height,
                      key: toJS(this.fileList).length
                    };

                    if (this.checkMutiple(fileItem)) {
                      console.log("没有重复的文件， 准备添加");
                      this.fileList.push(fileItem);
                      console.log(toJS(this.fileList));
                    }
                  }
                );
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 15,
    paddingBottom: 15
  },
  list: {
    flex: 3
  },
  iconPicker: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  title: {
    overflow: "hidden",
    fontSize: 16
  },
  containerStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    zIndex: 10,
    backgroundColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  row: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%"
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    flex: 0,
    top: 0,
    height: 41
  },
  backRightBtnLeft: {
    backgroundColor: "#5c9cff"
  },
  backRightBtnRight: {
    backgroundColor: "#d3171d"
  },
  listItemText: {
    marginLeft: 10,
    overflow: "hidden",
    height: 18,
    paddingRight: 10
  },
  left: {
    width: 50,
    height: 41,
    backgroundColor: "#5c9cff",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AttachmentUploader;
