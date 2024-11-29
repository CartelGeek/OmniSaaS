import {
  Typography,
  Card,
  Tabs,
  Form,
  Input,
  TimePicker,
  Switch,
  Button,
  Table,
  Tag,
  Space,
  Modal,
} from 'antd'
import { useState } from 'react'
import type { Prisma } from '@prisma/client'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AgentDetailsPage() {
  const { organizationId, agentId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('1')
  const [isIntegrationModalVisible, setIsIntegrationModalVisible] =
    useState(false)

  // Fetch agent data with conversations included
  const {
    data: agent,
    isLoading,
    refetch,
  } = Api.agent.findFirst.useQuery({
    where: { id: agentId },
    include: { conversations: true },
  })

  // Mutations
  const { mutateAsync: updateAgent } = Api.agent.update.useMutation()
  const { mutateAsync: updateIntegration } =
    Api.integration.update.useMutation()

  // Handle agent settings update
  const handleSettingsUpdate = async (values: any) => {
    await updateAgent({
      where: { id: agentId },
      data: {
        name: values.name,
        workingHoursStart: values.workingHours?.[0]?.format('HH:mm'),
        workingHoursEnd: values.workingHours?.[1]?.format('HH:mm'),
        status: values.status ? 'ACTIVE' : 'INACTIVE',
      },
    })
    refetch()
  }

  // Conversation columns for the table
  const conversationColumns = [
    {
      title: 'External User',
      dataIndex: 'externalUserId',
      key: 'externalUserId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Messages',
      dataIndex: 'messageCount',
      key: 'messageCount',
    },
    {
      title: 'Response Time',
      dataIndex: 'responseTime',
      key: 'responseTime',
      render: (time: number) => `${time.toString()}s`,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
  ]

  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <i className="las la-chart-line"></i> Performance
        </span>
      ),
      children: (
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              <Card>
                <Title level={4}>
                  <i className="las la-comments"></i> Total Conversations
                </Title>
                <Text>{agent?.conversations?.length || 0}</Text>
              </Card>
              <Card>
                <Title level={4}>
                  <i className="las la-clock"></i> Avg Response Time
                </Title>
                <Text>
                  {(
                    agent?.conversations?.reduce(
                      (acc, conv) => acc + (conv.responseTime || 0),
                      0,
                    ) / (agent?.conversations?.length || 1)
                  ).toFixed(2)}
                  s
                </Text>
              </Card>
              <Card>
                <Title level={4}>
                  <i className="las la-check-circle"></i> Status
                </Title>
                <Tag color={agent?.status === 'ACTIVE' ? 'green' : 'red'}>
                  {agent?.status}
                </Tag>
              </Card>
            </div>

            <Table
              dataSource={agent?.conversations}
              columns={conversationColumns}
              rowKey="id"
            />
          </Space>
        </Card>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <i className="las la-cog"></i> Settings
        </span>
      ),
      children: (
        <Card>
          <Form
            layout="vertical"
            initialValues={{
              name: agent?.name,
              workingHours: agent?.workingHoursStart
                ? [
                    dayjs(agent.workingHoursStart, 'HH:mm'),
                    dayjs(agent.workingHoursEnd, 'HH:mm'),
                  ]
                : undefined,
              status: agent?.status === 'ACTIVE',
            }}
            onFinish={handleSettingsUpdate}
          >
            <Form.Item
              label="Agent Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Working Hours" name="workingHours">
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
            <Form.Item
              label="Active Status"
              name="status"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Save Settings
            </Button>
          </Form>
        </Card>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <i className="las la-plug"></i> Integrations
        </span>
      ),
      children: (
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Button
              type="primary"
              onClick={() => setIsIntegrationModalVisible(true)}
            >
              <i className="las la-plus"></i> Add Integration
            </Button>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {['WhatsApp', 'N8N', 'Dify'].map(integration => (
                <Card key={integration}>
                  <Title level={4}>
                    <i className={`lab la-${integration.toLowerCase()}`}></i>{' '}
                    {integration}
                  </Title>
                  <Button>Configure</Button>
                </Card>
              ))}
            </div>
          </Space>
        </Card>
      ),
    },
  ]

  if (isLoading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-robot"></i> {agent?.name} Details
        </Title>
        <Text type="secondary">
          Manage and monitor your agent's performance, settings, and
          integrations
        </Text>

        <div style={{ marginTop: '24px' }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
          />
        </div>

        <Modal
          title="Add Integration"
          open={isIntegrationModalVisible}
          onCancel={() => setIsIntegrationModalVisible(false)}
          footer={null}
        >
          <Form layout="vertical">
            <Form.Item label="Integration Type" name="type">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Add Integration</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
