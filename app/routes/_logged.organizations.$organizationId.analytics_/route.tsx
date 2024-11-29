import {
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  DatePicker,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AnalyticsPage() {
  const { organizationId } = useParams()
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(30, 'days'),
    dayjs(),
  ])

  // Fetch conversations for response time analysis
  const { data: conversations } = Api.conversation.findMany.useQuery({
    where: {
      agent: {
        organizationId,
      },
    },
  })

  // Fetch agents for performance metrics
  const { data: agents } = Api.agent.findMany.useQuery({
    where: {
      organizationId,
    },
    include: {
      conversations: true,
    },
  })

  // Calculate metrics
  const totalConversations = conversations?.length || 0
  const averageResponseTime =
    conversations?.reduce((acc, conv) => acc + (conv.responseTime || 0), 0) /
      totalConversations || 0
  const totalMessages =
    conversations?.reduce((acc, conv) => acc + conv.messageCount, 0) || 0

  // Agent performance table columns
  const columns = [
    {
      title: 'Agent Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Total Conversations',
      dataIndex: 'conversationCount',
      key: 'conversationCount',
      sorter: (a: any, b: any) => a.conversationCount - b.conversationCount,
    },
    {
      title: 'Average Response Time (min)',
      dataIndex: 'avgResponseTime',
      key: 'avgResponseTime',
      sorter: (a: any, b: any) => a.avgResponseTime - b.avgResponseTime,
    },
    {
      title: 'Success Rate',
      dataIndex: 'successRate',
      key: 'successRate',
      render: (rate: number) => `${(rate * 100).toFixed(1)}%`,
    },
  ]

  // Transform agent data for table
  const agentTableData = agents?.map(agent => ({
    key: agent.id,
    name: agent.name,
    conversationCount: agent.conversations.length,
    avgResponseTime: (
      agent.conversations.reduce(
        (acc, conv) => acc + (conv.responseTime || 0),
        0,
      ) / agent.conversations.length || 0
    ).toFixed(2),
    successRate:
      agent.conversations.filter(conv => conv.status === 'completed').length /
        agent.conversations.length || 0,
  }))

  const handleExport = () => {
    const csvContent = [
      [
        'Analytics Report',
        `Generated on ${dayjs().format('YYYY-MM-DD HH:mm')}`,
      ],
      ['Metric', 'Value'],
      ['Total Conversations', totalConversations],
      ['Average Response Time (min)', averageResponseTime.toFixed(2)],
      ['Total Messages', totalMessages],
    ]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-report-${dayjs().format('YYYY-MM-DD')}.csv`
    a.click()
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>
            <i className="las la-chart-line" style={{ marginRight: '8px' }}></i>
            Analytics Dashboard
          </Title>
          <Text type="secondary">
            Monitor your team's performance and analyze conversation metrics
          </Text>
        </div>

        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Conversations"
                value={totalConversations}
                prefix={<i className="las la-comments"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Average Response Time (min)"
                value={averageResponseTime}
                precision={2}
                prefix={<i className="las la-clock"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Messages"
                value={totalMessages}
                prefix={<i className="las la-envelope"></i>}
              />
            </Card>
          </Col>
        </Row>

        <Card
          title={
            <span>
              <i className="las la-user-tie" style={{ marginRight: '8px' }}></i>
              Agent Performance
            </span>
          }
          extra={
            <Button type="primary" onClick={handleExport}>
              <i
                className="las la-file-export"
                style={{ marginRight: '8px' }}
              ></i>
              Export Report
            </Button>
          }
        >
          <DatePicker.RangePicker
            value={dateRange}
            onChange={dates => dates && setDateRange(dates)}
            style={{ marginBottom: '16px' }}
          />
          <Table columns={columns} dataSource={agentTableData} />
        </Card>
      </div>
    </PageLayout>
  )
}
