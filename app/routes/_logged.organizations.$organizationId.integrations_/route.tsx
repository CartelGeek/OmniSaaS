import {
  Card,
  Typography,
  Switch,
  Form,
  Input,
  Button,
  Space,
  Divider,
  Row,
  Col,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function IntegrationsPage() {
  const { organizationId } = useParams()
  const [whatsappForm] = Form.useForm()
  const [n8nForm] = Form.useForm()
  const [difyForm] = Form.useForm()
  const [crmForm] = Form.useForm()

  // Fetch existing integrations
  const { data: integrations, refetch } = Api.integration.findMany.useQuery({
    where: { organizationId },
  })

  const { mutateAsync: createIntegration } =
    Api.integration.create.useMutation()
  const { mutateAsync: updateIntegration } =
    Api.integration.update.useMutation()

  const [loading, setLoading] = useState(false)

  const handleIntegrationUpdate = async (type: string, config: any) => {
    setLoading(true)
    try {
      const existing = integrations?.find(i => i.type === type)
      if (existing) {
        await updateIntegration({
          where: { id: existing.id },
          data: { config, status: 'ACTIVE' },
        })
      } else {
        await createIntegration({
          data: {
            type,
            config,
            status: 'ACTIVE',
            organizationId: organizationId!,
          },
        })
      }
      message.success(`${type} integration updated successfully`)
      refetch()
    } catch (error) {
      message.error(`Failed to update ${type} integration`)
    }
    setLoading(false)
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-plug" style={{ marginRight: 8 }}></i>
          Integrations
        </Title>
        <Text>
          Configure and manage your integrations to enhance your workflow
        </Text>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <i className="lab la-whatsapp" style={{ fontSize: 24 }}></i>
                  <span>WhatsApp Integration</span>
                </Space>
              }
            >
              <Form
                form={whatsappForm}
                layout="vertical"
                onFinish={values => handleIntegrationUpdate('WHATSAPP', values)}
              >
                <Form.Item
                  label="API Key"
                  name="apiKey"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter WhatsApp Business API Key" />
                </Form.Item>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter Business Phone Number" />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save WhatsApp Configuration
                </Button>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <i className="las la-robot" style={{ fontSize: 24 }}></i>
                  <span>N8N Workflow</span>
                </Space>
              }
            >
              <Form
                form={n8nForm}
                layout="vertical"
                onFinish={values => handleIntegrationUpdate('N8N', values)}
              >
                <Form.Item
                  label="Webhook URL"
                  name="webhookUrl"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter N8N Webhook URL" />
                </Form.Item>
                <Form.Item
                  label="API Token"
                  name="apiToken"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter N8N API Token" />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save N8N Configuration
                </Button>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <i className="las la-brain" style={{ fontSize: 24 }}></i>
                  <span>Dify AI Settings</span>
                </Space>
              }
            >
              <Form
                form={difyForm}
                layout="vertical"
                onFinish={values => handleIntegrationUpdate('DIFY', values)}
              >
                <Form.Item
                  label="API Key"
                  name="apiKey"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter Dify AI API Key" />
                </Form.Item>
                <Form.Item label="Model Configuration" name="modelConfig">
                  <Input.TextArea placeholder="Enter Model Configuration (JSON)" />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save Dify Configuration
                </Button>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <Space>
                  <i className="las la-chart-bar" style={{ fontSize: 24 }}></i>
                  <span>Optional Integrations</span>
                </Space>
              }
            >
              <Form
                form={crmForm}
                layout="vertical"
                onFinish={values => handleIntegrationUpdate('CRM', values)}
              >
                <Form.Item label="CRM Provider" name="provider">
                  <Input placeholder="Enter CRM Provider (e.g., Salesforce, HubSpot)" />
                </Form.Item>
                <Form.Item label="API Credentials" name="credentials">
                  <Input.Password placeholder="Enter API Credentials" />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save CRM Configuration
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
