import React, { Component } from 'react';
import { MdDelete as RemoveIcon } from 'react-icons/md';
import './PostCard.scss';
import koLocale from 'date-fns/locale/ko';
import differenceInDays from 'date-fns/difference_in_days';
import distanceInWords from 'date-fns/distance_in_words';
import format from 'date-fns/format';

class PostCard extends Component {
  prev = null;

  get formattedDate() {
    const now = new Date();
    const date = new Date(this.props.post.date);

    // 1분 이내면 방금
    if (now - date < 60 * 1000) return '방금';
    // 10일 이내면 텍스트 형식
    if (differenceInDays(now, date) < 10) {
      return distanceInWords(now, date, { locale: koLocale, addSuffix: true });
    }
    // 그 외의 경우엔 YYYY-MM-DD
    return format(date, 'YYYY-MM-DD');
  }

  componentDidUpdate(prevProps, prevState) {
    this.prev = this.formattedDate; // prev 에 현재 formattedDate 담기
  }

  componentDidMount() {
    this.prev = this.formattedDate; // prev 에 현재 formattedDate 담기
  }

  shouldComponentUpdate(nextProps, nextState) {
    /* 컴포넌트는 다음 상황에 업데이트 해야 함 
      - post 가 바뀜
      - formattedDate 랑 prev 값이랑 다름
    */
    return (
      this.props.post !== nextProps.post || this.formattedDate !== this.prev
    );
  }

  handleRemove = () => {
    const { post, onRemove } = this.props;
    onRemove(post.id);
  }
  render() {
    const {
      post: { date, text },
    } = this.props;

    return (
      <div className="PostCard">
        <div className="remove" onClick={this.handleRemove}>
          <RemoveIcon />
        </div>
        <div className="date">{this.formattedDate}</div>
        <div className="text">{text}</div>
      </div>
    );
  }
}

export default PostCard;