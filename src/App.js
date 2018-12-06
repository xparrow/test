import React, { Component } from 'react';
import './App.scss';
import AppTemplate from './components/AppTemplate';
import Header from './components/Header';
import HeaderNav from './components/HeaderNav';
import Button from './components/Button';
import WriteBox from './components/WriteBox';
import PostCardList from './components/PostCardList';

class App extends Component {
  id = 2;
  state = {
    tab: 'home',
    writeBox: false,
    posts: [
      {
        id: 2,
        text:
          '무엇을 생각하면 좋을까? 나도 잘 모르겠다. \n엔터를 했을 때도 새 줄이 먹히도록 설정했다.\n딱히 제한은 두지 않았다.',
        date: '2018-11-30 02:03:15',
      },
      {
        id: 1,
        text: '최근에 작성한게 위로 올라오니까 이건 옛날에 작성됐고 두번째다.',
        date: '2018-11-20 01:03:15',
      },
      {
        id: 0,
        text: '엄청 오래된건 그냥 날짜가 나타났으면 좋겠다.',
        date: '2018-07-01 01:03:15',
      },
    ],
  };

  handleSelectTab = tab => {
    this.setState({ tab });
  };

  handleToggleWriteBox = () => {
    this.setState({
      writeBox: !this.state.writeBox,
    });
  };

  handleWrite = text => {
    console.log(text);
    this.setState({
      posts: [
        {
          id: ++this.id,
          text,
          date: new Date(),
        },
        ...this.state.posts,
      ],
      writeBox: false, // 모달 닫기
    });                                                                                     
  };

  handleRemove = id => {
    this.setState({
      posts: this.state.posts.filter(post => post.id !== id),
    });
  };

  // posts 가 변경 될 때 JSON 을 문자열로 변경하여 localStorage 에 저장
  componentDidUpdate(prevProps, prevState) {
    if (this.state.posts !== prevState.posts) {
      localStorage.setItem('posts', JSON.stringify(this.state.posts));
    }
  }

  // 브라우저에 App 이 처음 나타날 때 localStorage 안에 값이 있으면 해당 데이터 사용
  componentDidMount() {
    const posts = localStorage.getItem('posts');
    console.log('local' + posts);
    if (posts) {
      const parsed = JSON.parse(posts);
      this.setState({
        posts: parsed,
      });
      this.id = parsed[0] ? parsed[0].id : 0;
    }
  }

  render() {
    const { tab, writeBox, posts } = this.state;

    return (
      <div className="App">
        <AppTemplate header={<Header left={<HeaderNav tab={tab} onSelect={this.handleSelectTab} />} right={<Button onClick={this.handleToggleWriteBox}>새 글 작성</Button>} />}>
          {writeBox && <WriteBox onClose={this.handleToggleWriteBox} onWrite={this.handleWrite} /> }
          <PostCardList posts={posts} onRemove={this.handleRemove} />
        </AppTemplate>
      </div>
    );
  }
}

export default App;
