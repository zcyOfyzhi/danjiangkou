class AMap {

  mapView;

  // 缩放级别
  zoomLevel;

  // 中心点
  center = [];

  // 实时定位点
  mapLocation;


  //全局导航起始点
  navigationPoint;

  //地图上当前点击的界桩信息
  jzdInfo;

  setZoomLevel(zoomLevel) {
    this.zoomLevel = zoomLevel;
  }

  setMapCenter(center) {
    this.center = center;
  }

  setMapView(mapView) {
    this.mapView = mapView;
  }

  setMapLocation(mapLocation) {
    this.mapLocation = mapLocation
  }

  setNavigationPoint(navigationPoint) {
    this.navigationPoint = navigationPoint
  }

  setActiveJzdInfo(jzdInfo) {
    this.jzdInfo = jzdInfo
  }

}

export default AMap;