import React,{Fragment} from 'react';
import ChatApp from './ChatApp';
import {PageHeader} from 'antd';

const App = () => (
  <Fragment>
    <Header/>
    <ChatApp/>
  </Fragment>);

const Header = () => (
   <PageHeader title="IPFS chat" subTitle="Peer-to-Peer Distributed chat using IPFS" />
  )

export default App;

