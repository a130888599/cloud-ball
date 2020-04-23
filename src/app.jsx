import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";
import { Provider } from '@tarojs/redux'
import "./app.scss";
import configStore from "./store";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

Taro.cloud.init()

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  config = {
    pages: [
      "pages/mine/mine",
      "pages/index/index",
      "pages/team/team"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "云打球",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      selectedColor: "#1296db",
      list: [
        {
          pagePath: "pages/index/index",
          text: "广场",
          iconPath: "images/index.png",
          selectedIconPath: "images/index_selected.png"
        },
        {
          pagePath: "pages/mine/mine",
          text: "我的",
          iconPath: "images/mine.png",
          selectedIconPath: "images/mine_selected.png"
        }
      ]
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
