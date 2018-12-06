import React, { Component } from 'react';
import './PostCardList.scss';
import PostCard from '../PostCard';

class PostCardList extends Component {

  timerId = null;

  // 업데이트 최적화를 위한 shouldComponentUpdate
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.posts !== this.props.posts;
  }

  // 1분마다 강제 리렌더링 타이머 설정
  componentDidMount() {
    this.timerId = setInterval(() => {
      this.forceUpdate();
    }, 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const { posts, onRemove } = this.props;
    const postList = posts.map(post => <PostCard key={post.id} post={post} onRemove={onRemove} />);
    return (
      <div className="PostCardList">
        {postList}
      </div>
    );
  }
}

export default PostCardList;