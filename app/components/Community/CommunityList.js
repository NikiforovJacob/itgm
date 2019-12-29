import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { List, Icon, Button } from 'antd'

import useStoreon from 'storeon/react'

import VkIcon from '../../../asset/vk.svg'
import { GET_LIST } from '../../store/community'
import history from '../../history'

const CommunityList = () => {
  const { user, community, dispatch } = useStoreon('community', 'user')
  useEffect(() => {
    dispatch(GET_LIST)
  }, [dispatch])
  return (
    <div className="content">
      <h2>Сообщества</h2>
      {user && user.verified && (
        <Button
          icon="plus-circle"
          onClick={() => history.push('/community/new')}
        >
          Добавить сообщество
        </Button>
      )}
      <List
        itemLayout="vertical"
        size="large"
        pagination={false}
        loading={community.loading}
        dataSource={community.list}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={item.social.map(social => (
              <a key={social.icon} href={social.link} target="_blank">
                {social.icon === 'vk' ? (
                  <Icon style={{ fontSize: 24 }} component={VkIcon} />
                ) : (
                  <Icon style={{ fontSize: 24 }} type={social.icon} />
                )}
              </a>
            ))}
          >
            <h3>
              <Link to={`/community/${item.id}`}>{item.name}</Link>
            </h3>
            <div style={{ whiteSpace: 'pre-line' }}>{item.description}</div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default CommunityList