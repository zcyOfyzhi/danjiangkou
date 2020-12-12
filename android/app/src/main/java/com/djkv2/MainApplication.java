package com.djkv2;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.zmxv.RNSound.RNSoundPackage;
import com.entria.views.RNViewOverflowPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import cn.qiuxiang.react.amap3d.AMap3DPackage;
import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;

//import com.github.wuxudong.rncharts.MPAndroidChartPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

//import com.brentvatne.react.ReactVideoPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSoundPackage(),
            new RNViewOverflowPackage(),
            new VectorIconsPackage(),
            new SvgPackage(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new RNFSPackage(),
            new RNFetchBlobPackage(),
            new ReactNativeAudioPackage(),
            new AMap3DPackage(),
            new AMapGeolocationPackage(),
            //new ReactVideoPackage()
            //new MPAndroidChartPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
