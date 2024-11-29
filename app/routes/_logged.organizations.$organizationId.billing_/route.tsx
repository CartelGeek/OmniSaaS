import {
  Typography,
  Card,
  Button,
  Table,
  Tag,
  Space,
  Row,
  Col,
  Spin,
} from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BillingPage() {
  const { organization } = useUserContext()

  // Fetch billing data
  const { data: products, isLoading: loadingProducts } =
    Api.billing.findManyProducts.useQuery({})
  const { data: subscriptions, isLoading: loadingSubscriptions } =
    Api.billing.findManySubscriptions.useQuery({})
  const { data: payments, isLoading: loadingPayments } =
    Api.billing.findManyPayments.useQuery({})
  const { mutateAsync: createPayment } =
    Api.billing.createPaymentLink.useMutation()

  const currentSubscription = subscriptions?.[0]

  const handleUpgrade = async (productId: string) => {
    try {
      const paymentLink = await createPayment({ productId })
      window.location.href = paymentLink
    } catch (error) {
      console.error('Error creating payment link:', error)
    }
  }

  const paymentColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('MMMM D, YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${(amount / 100).toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'succeeded' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Invoice',
      key: 'invoice',
      render: (record: any) => (
        <Button type="link" href={record.invoiceUrl} target="_blank">
          <i className="las la-file-invoice"></i> View
        </Button>
      ),
    },
  ]

  if (loadingProducts || loadingSubscriptions || loadingPayments) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-credit-card"></i> Billing & Subscription
        </Title>
        <Text type="secondary">
          Manage your subscription plan and billing information
        </Text>

        <Card title="Current Subscription" style={{ marginTop: '24px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Text strong>Plan: </Text>
              <Text>{currentSubscription?.planType || 'Free'}</Text>
              <br />
              <Text strong>Status: </Text>
              <Tag
                color={
                  currentSubscription?.status === 'active' ? 'green' : 'orange'
                }
              >
                {currentSubscription?.status?.toUpperCase() || 'INACTIVE'}
              </Tag>
              <br />
              <Text strong>Period: </Text>
              <Text>
                {currentSubscription
                  ? `${dayjs(currentSubscription.currentPeriodStart).format(
                      'MMM D, YYYY',
                    )} - 
                     ${dayjs(currentSubscription.currentPeriodEnd).format(
                       'MMM D, YYYY',
                     )}`
                  : 'N/A'}
              </Text>
            </Col>
            <Col xs={24} md={12} style={{ textAlign: 'right' }}>
              <Space>
                <Button type="primary" icon={<i className="las la-crown"></i>}>
                  Manage Subscription
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Card title="Available Plans" style={{ marginTop: '24px' }}>
          <Row gutter={[24, 24]}>
            {products?.map(product => (
              <Col xs={24} sm={12} md={8} key={product.id}>
                <Card>
                  <Title level={4}>{product.name}</Title>
                  <Text strong>${(product.price / 100).toString()}/month</Text>
                  <p>{product.description}</p>
                  <Button
                    type="primary"
                    block
                    onClick={() => handleUpgrade(product.id)}
                  >
                    {currentSubscription ? 'Switch Plan' : 'Subscribe'}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        <Card title="Billing History" style={{ marginTop: '24px' }}>
          <Table
            columns={paymentColumns}
            dataSource={payments}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
