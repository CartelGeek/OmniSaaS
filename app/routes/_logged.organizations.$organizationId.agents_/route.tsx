import {
  Typography,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  TimePicker,
  Popconfirm,
  Space,
  Row,
  Col,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AgentsPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  // Fetch agents and templates
  const { data: agents, refetch: refetchAgents } = Api.agent.findMany.useQuery({
    where: { organizationId },
    include: { template: true },
  })

  const { data: templates } = Api.template.findMany.useQuery({
    where: { organizationId },
  })

  // Mutations
  const createAgent = Api.agent.create.useMutation()
  const deleteAgent = Api.agent.delete.useMutation()
  const updateAgent = Api.agent.update.useMutation()

  const handleCreate = async (values: any) => {
    try {
      await createAgent.mutateAsync({
        data: {
          ...values,
          organizationId,
          workingHoursStart: values.workingHours?.[0]?.format('HH:mm'),
          workingHoursEnd: values.workingHours?.[1]?.format('HH:mm'),
        },
      })
      setIsModalOpen(false)
      form.resetFields()
      refetchAgents()
    } catch (error) {
      console.error('Error creating agent:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteAgent.mutateAsync({ where: { id } })
      refetchAgents()
    } catch (error) {
      console.error('Error deleting agent:', error)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Template',
      dataIndex: ['template', 'name'],
      key: 'template',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Text type={status === 'ACTIVE' ? 'success' : 'warning'}>
          {status || 'INACTIVE'}
        </Text>
      ),
    },
    {
      title: 'Working Hours',
      key: 'workingHours',
      render: (record: any) => (
        <Text>
          {record.workingHoursStart && record.workingHoursEnd
            ? `${record.workingHoursStart} - ${record.workingHoursEnd}`
            : 'Not set'}
        </Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button
            type="link"
            onClick={() =>
              navigate(`/organizations/${organizationId}/agents/${record.id}`)
            }
          >
            <i className="las la-edit" /> Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this agent?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              <i className="las la-trash-alt" /> Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={23} sm={23} md={22} lg={20} xl={18}>
          <div style={{ padding: '24px 0' }}>
            <Card>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 24,
                }}
              >
                <div>
                  <Title level={2}>AI Agents</Title>
                  <Text>Manage your AI agents and their configurations</Text>
                </div>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                  <i className="las la-plus" /> Create Agent
                </Button>
              </div>

              <Table
                dataSource={agents}
                columns={columns}
                rowKey="id"
                loading={!agents}
              />

              <Modal
                title="Create New Agent"
                open={isModalOpen}
                onCancel={() => {
                  setIsModalOpen(false)
                  form.resetFields()
                }}
                footer={null}
              >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                  <Form.Item
                    name="name"
                    label="Agent Name"
                    rules={[
                      { required: true, message: 'Please input agent name!' },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="templateId"
                    label="Template"
                    rules={[
                      { required: true, message: 'Please select a template!' },
                    ]}
                  >
                    <Select>
                      {templates?.map(template => (
                        <Select.Option key={template.id} value={template.id}>
                          {template.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item name="workingHours" label="Working Hours">
                    <TimePicker.RangePicker format="HH:mm" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Create Agent
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </Card>
          </div>
        </Col>
      </Row>
    </PageLayout>
  )
}
