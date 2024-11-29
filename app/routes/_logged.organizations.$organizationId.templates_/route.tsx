import { Typography, Card, Select, Row, Col, Button, Space, Empty } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TemplatesPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()

  // Fetch templates with organization included
  const { data: templates, isLoading } = Api.template.findMany.useQuery({
    where: { organizationId },
    include: { organization: true },
  })

  // State for category filter
  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Filter templates based on selected type
  const filteredTemplates = templates?.filter(
    template => !selectedType || template.type === selectedType,
  )

  // Get unique types for filter dropdown
  const templateTypes = [
    ...new Set(templates?.map(t => t.type).filter(Boolean)),
  ]

  const handleSelectTemplate = (templateId: string) => {
    navigate(
      `/organizations/${organizationId}/agents/new?templateId=${templateId}`,
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Title level={2}>
            <i className="las la-robot" style={{ marginRight: 8 }}></i>
            AI Agent Templates
          </Title>
          <Text>
            Choose from our collection of pre-built AI agent templates to get
            started quickly
          </Text>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Space>
            <Text strong>Filter by type:</Text>
            <Select
              style={{ width: 200 }}
              placeholder="Select type"
              allowClear
              onChange={value => setSelectedType(value)}
            >
              {templateTypes.map(type => (
                <Select.Option key={type} value={type}>
                  {type?.charAt(0).toUpperCase() + type?.slice(1)}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <i className="las la-spinner la-spin" style={{ fontSize: 24 }}></i>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {filteredTemplates?.length ? (
              filteredTemplates.map(template => (
                <Col xs={24} sm={12} lg={8} key={template.id}>
                  <Card
                    hoverable
                    style={{ height: '100%' }}
                    actions={[
                      <Button
                        type="primary"
                        key="use"
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <i
                          className="las la-plus"
                          style={{ marginRight: 4 }}
                        ></i>
                        Use Template
                      </Button>,
                    ]}
                  >
                    <div style={{ marginBottom: 16 }}>
                      <Text strong style={{ fontSize: 18 }}>
                        <i
                          className={`las ${
                            template.type === 'transcription'
                              ? 'la-file-audio'
                              : template.type === 'sales'
                              ? 'la-dollar-sign'
                              : template.type === 'support'
                              ? 'la-headset'
                              : 'la-robot'
                          }`}
                          style={{ marginRight: 8 }}
                        ></i>
                        {template.name}
                      </Text>
                    </div>

                    {template.category && (
                      <div style={{ marginBottom: 8 }}>
                        <Text type="secondary">
                          <i
                            className="las la-tag"
                            style={{ marginRight: 4 }}
                          ></i>
                          {template.category}
                        </Text>
                      </div>
                    )}

                    {template.description && (
                      <Text type="secondary">{template.description}</Text>
                    )}
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Empty
                  description="No templates found"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </Col>
            )}
          </Row>
        )}
      </div>
    </PageLayout>
  )
}
