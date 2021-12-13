import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Popover } from 'antd';
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PostImages from '../components/postImages';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  // const id = useSelector((state) => state.user.me?.id);
  const id = useSelector((state) => state.user.me && state.user.me.id);
  // const id = me && me.id;

  const onToggleLike = useCallback((e) => {
    console.log(e);
    setLiked((prev) => !prev);
  }, []);
  const onToggleComment = useCallback((e) => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  return (
    <div style={{ marginTop: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Image} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button tyep="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
        {/* <Image />
        <Content /> */}
        <Button></Button>
      </Card>
      {commentFormOpened && <div>댓글부분</div>}
      {/* <CommentForm />
      <Comments /> */}
    </div>
  );
};

PostCard.protoType = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    imagePaths: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;
