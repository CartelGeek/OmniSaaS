import { Typography, Card, Space, Row, Col } from 'antd'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ padding: '2rem' }}>
        <Col xs={24} sm={20} md={16} lg={14}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Header Section */}
            <div style={{ textAlign: 'center' }}>
              <Title level={1}>
                <i className="las la-robot" style={{ marginRight: '10px' }} />
                Welcome to AI Agent Manager
              </Title>
              <Paragraph style={{ fontSize: '18px' }}>
                Your all-in-one platform for managing AI agents and automating
                customer interactions
              </Paragraph>
            </div>

            {/* Main Features */}
            <Card>
              <Title level={2}>
                <i className="las la-magic" style={{ marginRight: '10px' }} />
                How It Works
              </Title>

              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                <div>
                  <Title level={4}>
                    <i
                      className="las la-copy"
                      style={{ marginRight: '10px' }}
                    />
                    1. Create Templates
                  </Title>
                  <Paragraph>
                    Start by creating templates that define how your AI agents
                    should behave and respond. Templates are reusable
                    configurations that save you time.
                  </Paragraph>
                </div>

                <div>
                  <Title level={4}>
                    <i
                      className="las la-user-astronaut"
                      style={{ marginRight: '10px' }}
                    />
                    2. Deploy Agents
                  </Title>
                  <Paragraph>
                    Deploy AI agents based on your templates. Each agent can be
                    customized with specific working hours and communication
                    channels.
                  </Paragraph>
                </div>

                <div>
                  <Title level={4}>
                    <i
                      className="las la-comments"
                      style={{ marginRight: '10px' }}
                    />
                    3. Manage Conversations
                  </Title>
                  <Paragraph>
                    Monitor and analyze conversations between your AI agents and
                    customers. Track response times and message counts for
                    better service.
                  </Paragraph>
                </div>

                <div>
                  <Title level={4}>
                    <i
                      className="las la-chart-line"
                      style={{ marginRight: '10px' }}
                    />
                    4. Track Analytics
                  </Title>
                  <Paragraph>
                    Get insights into your agents' performance with detailed
                    analytics. Measure success and identify areas for
                    improvement.
                  </Paragraph>
                </div>
              </Space>
            </Card>

            {/* Getting Started */}
            <Card>
              <Title level={2}>
                <i className="las la-rocket" style={{ marginRight: '10px' }} />
                Getting Started
              </Title>
              <Paragraph>
                To begin using the platform, navigate to the Templates section
                to create your first template. Once you have a template, you can
                create and deploy agents to start handling customer interactions
                automatically.
              </Paragraph>
              <Paragraph>
                Need help? Our support team is always ready to assist you with
                any questions or concerns.
              </Paragraph>
            </Card>
          </Space>
        </Col>
      </Row>
    </PageLayout>
  )
}
