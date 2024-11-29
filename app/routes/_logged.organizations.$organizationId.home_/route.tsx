import { Typography, Card, Row, Col, Button, Statistic, Space } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const navigate = useNavigate()
  const { organizationId } = useParams()
  const { organization } = useUserContext()

  // Fetch active agents
  const { data: agents } = Api.agent.findMany.useQuery({
    where: {
      organizationId,
      status: 'ACTIVE',
    },
    include: {
      conversations: true,
    },
  })

  // Fetch recent conversations
  const { data: recentConversations } = Api.conversation.findMany.useQuery({
    where: {
      agent: {
        organizationId,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  })

  // Calculate statistics
  const totalAgents = agents?.length || 0
  const totalConversations =
    agents?.reduce(
      (acc, agent) => acc + (agent.conversations?.length || 0),
      0,
    ) || 0
  const averageResponseTime =
    agents?.reduce((acc, agent) => {
      const conversations = agent.conversations || []
      const responseTimesSum = conversations.reduce(
        (sum, conv) => sum + (conv.responseTime || 0),
        0,
      )
      return conversations.length
        ? acc + responseTimesSum / conversations.length
        : acc
    }, 0) / (totalAgents || 1)

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Header Section */}
          <div>
            <Title level={2}>
              <i className="las la-home" /> Dashboard
            </Title>
            <Text type="secondary">
              Monitor your agents' performance and manage your organization's
              activities
            </Text>
          </div>

          {/* Quick Actions */}
          <Card>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Button
                  type="primary"
                  icon={<i className="las la-plus" />}
                  block
                  onClick={() =>
                    navigate(`/organizations/${organizationId}/agents/new`)
                  }
                >
                  Create New Agent
                </Button>
              </Col>
              <Col xs={24} sm={12}>
                <Button
                  icon={<i className="las la-copy" />}
                  block
                  onClick={() =>
                    navigate(`/organizations/${organizationId}/templates`)
                  }
                >
                  Manage Templates
                </Button>
              </Col>
            </Row>
          </Card>

          {/* Statistics Cards */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title={
                    <>
                      <i className="las la-robot" /> Active Agents
                    </>
                  }
                  value={totalAgents}
                  suffix="agents"
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title={
                    <>
                      <i className="las la-comments" /> Total Conversations
                    </>
                  }
                  value={totalConversations}
                  suffix="messages"
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title={
                    <>
                      <i className="las la-clock" /> Avg Response Time
                    </>
                  }
                  value={averageResponseTime.toFixed(2)}
                  suffix="seconds"
                />
              </Card>
            </Col>
          </Row>

          {/* Recent Activity */}
          <Card
            title={
              <>
                <i className="las la-history" /> Recent Activity
              </>
            }
          >
            {recentConversations?.map(conversation => (
              <div key={conversation.id} style={{ marginBottom: '12px' }}>
                <Text>
                  <i className="las la-comment" /> Conversation with{' '}
                  {conversation.externalUserId || 'Anonymous'} -{' '}
                  {conversation.messageCount.toString()} messages -{' '}
                  {dayjs(conversation.createdAt).format('MMM D, YYYY HH:mm')}
                </Text>
              </div>
            ))}
          </Card>

          {/* Organization Info */}
          <Card
            title={
              <>
                <i className="las la-building" /> Organization Information
              </>
            }
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Text strong>Organization Name: </Text>
                <Text>{organization?.name}</Text>
              </Col>
              <Col xs={24} sm={12}>
                <Text strong>Created: </Text>
                <Text>
                  {dayjs(organization?.createdAt).format('MMMM D, YYYY')}
                </Text>
              </Col>
            </Row>
          </Card>
        </Space>
      </div>
    </PageLayout>
  )
}
