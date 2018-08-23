import React, { Component } from 'react';
import { View } from 'react-native';

/** * InActive NavigationIcons */

import walletIcon from '../../images/walletBlack.png';
import sendIcon from '../../images/sendIcon.png';
import depositIcon from '../../images/downloading_Black.png';
import activityIcon from '../../images/running_menBlack.png';

/** * Active NavigationIcons */
import walletWhiteIcon from '../../images/wallet_white.png';
import sendWhiteIcon from '../../images/sendWhite.png';
import depositWhiteIcon from '../../images/downloading_white.png';
import activityWhiteIcon from '../../images/running_men_White.png';

/*** Color Constants */
import { ACTIVE_TAB_COLOR, WHITE_COLOR } from '../../common/constants/';

import style from './style';
import Tab from './tab/index';
import TabInfo from './tab/tabInfo/';

class HomeNavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      tabRenderInfo: 'walletIcon',
      tabIconList: [
        { inActiveIcon: walletIcon, activeIcon: walletWhiteIcon, tabRenderInfo: 'walletIcon' },
        { inActiveIcon: sendIcon, activeIcon: sendWhiteIcon, tabRenderInfo: 'sendIcon' },
        { inActiveIcon: depositIcon, activeIcon: depositWhiteIcon, tabRenderInfo: 'depositIcon' },
      ]
    }
  }

  handleSelectedTab = (index, tabRenderInfo) => {
    this.setState({
      activeTabIndex: index,
      tabRenderInfo: tabRenderInfo,
    })
  }

  render() {
    const { tabIconList, activeTabIndex, tabRenderInfo } = this.state;

    let renderTabIfo = <TabInfo tabRenderInfo={tabRenderInfo} navigation={this.props.navigation} />

    let renderTabNavigation = tabIconList.length > 0 && tabIconList.map((tabIfo, index) => (
      <Tab
        activeTabIndex={activeTabIndex}
        index={index}
        ACTIVE_TAB_COLOR={ACTIVE_TAB_COLOR}
        WHITE_COLOR={WHITE_COLOR}
        tabIfo={tabIfo}
        handleSelectedTab={this.handleSelectedTab.bind(this)} />
    ))

    return (
      <View style={style.mainContainerStyle}>
        <View style={style.tabInfoStyle}>
          {renderTabIfo}
        </View>
        <View
          style={style.navigationTabStyle}>
          {renderTabNavigation}
        </View>
      </View>
    )
  }
}

export default HomeNavigationBar;