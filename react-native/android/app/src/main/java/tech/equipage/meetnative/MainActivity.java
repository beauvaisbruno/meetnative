package tech.equipage.meetnative;
import android.content.Intent;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;


public class MainActivity extends ReactActivity {

 @Override
 public void onActivityResult(int requestCode, int resultCode, Intent data) {
  super.onActivityResult(requestCode, resultCode, data);
  MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
 }

 /**
  * Returns the name of the main component registered from JavaScript.
  * This is used to schedule rendering of the component.
  */
 @Override
 protected String getMainComponentName() {
  return "meetnative";
 }

 @Override
 protected ReactActivityDelegate createReactActivityDelegate() {
  return new ReactActivityDelegate(this, getMainComponentName()) {
   @Override
   protected ReactRootView createRootView() {
    return new RNGestureHandlerEnabledRootView(MainActivity.this);
   }
  };
 }
}
