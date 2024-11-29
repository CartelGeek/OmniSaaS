import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `24/7 Automated Customer Service`,
      description: `Never miss a customer inquiry again with AI-powered WhatsApp agents that handle conversations around the clock.`,
      icon: <i className="las la-clock"></i>,
    },
    {
      heading: `Instant Audio Transcription`,
      description: `Convert voice messages to text instantly, making customer communication searchable and actionable.`,
      icon: <i className="las la-microphone"></i>,
    },
    {
      heading: `Smart Sales Automation`,
      description: `Automate follow-ups and qualify leads automatically while maintaining a personal touch.`,
      icon: <i className="las la-chart-line"></i>,
    },
    {
      heading: `Multi-Language Support`,
      description: `Break language barriers with automatic translation across 100+ languages.`,
      icon: <i className="las la-language"></i>,
    },
    {
      heading: `CRM Integration`,
      description: `Seamlessly connect with your existing tools and maintain a single source of truth.`,
      icon: <i className="las la-sync"></i>,
    },
    {
      heading: `Analytics Dashboard`,
      description: `Track performance metrics and customer insights in real-time to optimize your communication strategy.`,
      icon: <i className="las la-chart-bar"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `E-commerce Owner`,
      content: `AIConnect transformed our customer service. We're now handling 3x more inquiries with half the team, and our customer satisfaction has never been higher.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Marcus Rodriguez`,
      designation: `Digital Agency Director`,
      content: `The audio transcription feature is a game-changer. We've reduced response times by 70% and can finally measure customer sentiment accurately.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `David Kumar`,
      designation: `Sales Manager`,
      content: `Our sales team loves the automated follow-ups. We've seen a 45% increase in conversion rates since implementing AIConnect.`,
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Startup`,
      description: `Perfect for small businesses getting started with automation`,
      monthly: 49,
      yearly: 470,
      features: [
        `Up to 1,000 conversations/month`,
        `2 AI agents`,
        `Basic analytics`,
        `Email support`,
      ],
    },
    {
      title: `Growth`,
      description: `Ideal for growing businesses with higher volume needs`,
      monthly: 99,
      yearly: 950,
      features: [
        `Up to 5,000 conversations/month`,
        `5 AI agents`,
        `Advanced analytics`,
        `Priority support`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solutions for large-scale operations`,
      monthly: 249,
      yearly: 2390,
      features: [
        `Unlimited conversations`,
        `Unlimited agents`,
        `Custom integrations`,
        `Dedicated support`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How quickly can I get started with AIConnect?`,
      answer: `You can be up and running in less than 5 minutes. Simply connect your WhatsApp Business account and choose your automation templates.`,
    },
    {
      question: `Do I need technical knowledge to use AIConnect?`,
      answer: `Not at all! Our platform is designed to be user-friendly with a drag-and-drop interface and pre-built templates.`,
    },
    {
      question: `Can I customize the AI responses?`,
      answer: `Yes, you have full control over your AI agents' responses and can train them with your specific business knowledge.`,
    },
    {
      question: `What happens if the AI can't handle a query?`,
      answer: `The system automatically escalates complex queries to human agents while maintaining conversation context.`,
    },
  ]

  const steps = [
    {
      heading: `Connect WhatsApp`,
      description: `Link your WhatsApp Business account in one click`,
    },
    {
      heading: `Choose Templates`,
      description: `Select from pre-built automation workflows for your industry`,
    },
    {
      heading: `Train Your AI`,
      description: `Customize responses with your business knowledge`,
    },
    {
      heading: `Go Live`,
      description: `Launch your automated customer service in minutes`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Drowning in unanswered messages`,
    },
    {
      emoji: `⏰`,
      title: `Working overtime to keep up with customer demands`,
    },
    {
      emoji: `💸`,
      title: `Losing sales due to slow response times`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Transform Your WhatsApp Into an AI-Powered Sales & Support Machine`}
        subtitle={`Handle thousands of customer conversations automatically while maintaining a personal touch. Join 1000+ businesses saving 40% on customer service costs.`}
        buttonText={`Start Free Trial`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/hKnip4-aiconnect-kuhN`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={1000}
            suffixText={`from happy businesses`}
          />
        }
      />
      <LandingSocialProof title={`Trusted By Leading Brands`} />
      <LandingPainPoints
        title={`68% of businesses lose customers due to slow response times. Don't be one of them.`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Automate Your Customer Service in 4 Simple Steps`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need to Scale Your Customer Communication`}
        subtitle={`Powerful features that help you deliver exceptional service 24/7`}
        features={features}
      />
      <LandingTestimonials
        title={`Join 1000+ Businesses Already Saving Time and Money`}
        subtitle={`See how AIConnect is transforming customer service across industries`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Choose Your Path to Automation`}
        subtitle={`Plans that grow with your business`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About AIConnect`}
        subtitle={`Everything you need to know about getting started`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your Customer Service?`}
        subtitle={`Join thousands of businesses delivering exceptional customer experiences at scale`}
        buttonText={`Start Your Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
