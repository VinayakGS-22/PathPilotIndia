import { Link } from 'react-router-dom';
import { Check, Shield, CreditCard, Star, Clock } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { PRICING_PLANS } from '../lib/constants';

export default function PricingPage() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-gray-600">Start for free. Premium plans launching soon.</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-sm font-medium">
              <Clock className="w-4 h-4" /> Premium plans coming soon
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan) => {
              const isPaid = plan.price > 0;
              return (
                <div key={plan.id} className={`relative rounded-2xl border-2 p-7 ${isPaid ? 'border-gray-200 bg-gray-50/60 opacity-75' : plan.popular ? 'border-blue-600 bg-white ring-2 ring-blue-600' : 'border-gray-200 bg-white'}`}>
                  {isPaid && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full whitespace-nowrap flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> Coming Soon
                    </div>
                  )}
                  {plan.popular && !isPaid && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">Most Popular</div>
                  )}
                  <div className="mb-5">
                    <h3 className={`text-xl font-bold mb-1 ${isPaid ? 'text-gray-500' : 'text-gray-900'}`}>{plan.name}</h3>
                    {plan.description && <p className={`text-xs mb-3 ${isPaid ? 'text-gray-400' : 'text-gray-500'}`}>{plan.description}</p>}
                    <div className="flex items-baseline gap-1">
                      <span className={`text-3xl font-bold ${isPaid ? 'text-gray-400' : 'text-gray-900'}`}>
                        {plan.price === 0 ? 'Free' : `₹${plan.price.toLocaleString()}`}
                      </span>
                      {plan.price > 0 && plan.period !== 'one-time' && <span className={`text-sm ${isPaid ? 'text-gray-400' : 'text-gray-500'}`}>/{plan.period}</span>}
                      {plan.period === 'one-time' && plan.price > 0 && <span className={`text-sm ${isPaid ? 'text-gray-400' : 'text-gray-500'}`}>one-time</span>}
                    </div>
                  </div>
                  <ul className="space-y-2.5 mb-7">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isPaid ? 'text-gray-400' : 'text-emerald-500'}`} />
                        <span className={`text-sm ${isPaid ? 'text-gray-400' : 'text-gray-600'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.price === 0 ? (
                    <Link to="/signup" className="block w-full py-3 text-center rounded-xl font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all text-sm">
                      {plan.cta}
                    </Link>
                  ) : (
                    <Link to="/waitlist" className="block w-full py-3 text-center rounded-xl font-semibold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-all text-sm">
                      Join Waitlist
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-16 grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: 'Secure Payments', desc: 'Powered by Razorpay with bank-grade security', bg: 'bg-green-100', color: 'text-green-600' },
              { icon: CreditCard, title: 'Easy Refunds', desc: '7-day money-back guarantee, no questions asked', bg: 'bg-blue-100', color: 'text-blue-600' },
              { icon: Star, title: 'Trusted by 10,000+', desc: 'Indian parents use PathPilot for career planning', bg: 'bg-amber-100', color: 'text-amber-600' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Interested in a premium plan? Join the waitlist for early access.</p>
            <Link to="/waitlist" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/25">
              <Clock className="w-4 h-4" /> Join the Waitlist
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
