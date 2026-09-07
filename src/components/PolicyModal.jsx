import React from "react";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  X,
  CheckCircle2,
  Clock,
  MapPin,
  HelpCircle,
  PhoneCall,
  FileText
} from "lucide-react";

const policyData = {
  shipping: {
    title: "Free Express Shipping",
    subtitle: "Blazing fast doorstep delivery across all India pin codes",
    icon: Truck,
    badge: "2-3 Days Metro Delivery",
    badgeColor: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    features: [
      {
        title: "Same-Day Dispatch",
        description: "Orders placed before 2:00 PM are packed and dispatched on the same business day."
      },
      {
        title: "Free Delivery Above ₹5,000",
        description: "All standard & premium orders above ₹5,000 qualify for completely free express shipping."
      },
      {
        title: "Real-time Live GPS Tracking",
        description: "Receive instant SMS, WhatsApp, and email updates with direct courier live tracking link."
      },
      {
        title: "Tamper-Evident & Safe Packaging",
        description: "High-value tech devices are packed in multi-layered cushioned boxes with serialized security seals."
      }
    ],
    faqs: [
      {
        q: "What couriers do you use?",
        a: "We partner with premium priority logistics including Blue Dart, Bluedart Apex, Delhivery Express, and DTDC."
      },
      {
        q: "Can I schedule my delivery time?",
        a: "Yes! Once out for delivery, our logistics partner will share an OTP with options to choose your preferred time slot."
      }
    ]
  },
  warranty: {
    title: "1-Year Official Brand Warranty",
    subtitle: "100% Genuine, Authorized Manufacturer Protection",
    icon: ShieldCheck,
    badge: "Official Brand Service",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    features: [
      {
        title: "100% Brand Authorized Products",
        description: "All products are sourced directly from authorized brand distributors (Apple India, Samsung, Sony, etc.)."
      },
      {
        title: "Nationwide Service Network",
        description: "Avail free walk-in or doorstep warranty service at any official authorized service center across India."
      },
      {
        title: "Digital Tax GST Invoice",
        description: "Receive a valid GST invoice with IMEI / Serial number printed for seamless warranty registration and claim."
      },
      {
        title: "Free Technical Troubleshooting",
        description: "Our certified tech support team helps you with initial setup, diagnostics, and claim assistance."
      }
    ],
    faqs: [
      {
        q: "How do I claim my warranty?",
        a: "Simply take your device with the invoice provided in your order box or from your JGN STORE account to any brand service center."
      },
      {
        q: "Can I extend warranty coverage?",
        a: "Yes, AppleCare+ or brand extended warranty packs can be registered online within 60 days of purchase."
      }
    ]
  },
  returns: {
    title: "7-Day Hassle-Free Returns",
    subtitle: "Guaranteed peace of mind with 1-click doorstep pickup",
    icon: RotateCcw,
    badge: "No Questions Asked Replacement",
    badgeColor: "bg-orange-500/10 border-orange-500/30 text-orange-400",
    features: [
      {
        title: "Free Doorstep Pickup",
        description: "Our courier agent will pick up the item directly from your address at zero extra cost."
      },
      {
        title: "Instant Replacement or 100% Refund",
        description: "Choose between immediate brand new replacement or full refund credited to your original payment method."
      },
      {
        title: "Defect & Transit Damage Protection",
        description: "If item arrives broken, defective, or different from description, we resolve it within 24 hours."
      },
      {
        title: "Zero Complicated Paperwork",
        description: "Initiate return in 1-click directly from your order dashboard or via WhatsApp customer helpline."
      }
    ],
    faqs: [
      {
        q: "What are the return conditions?",
        a: "Product must be returned in original box with all accessories, bills, tags, and brand seal barcodes intact."
      },
      {
        q: "How fast will I get my refund?",
        a: "UPI / Net banking refunds are processed within 2-4 hours after pickup verification."
      }
    ]
  },
  support: {
    title: "24/7 Dedicated Tech Support",
    subtitle: "Expert assistance anytime for engineers, creators & tech lovers",
    icon: Sparkles,
    badge: "15-Min Response Guarantee",
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    features: [
      {
        title: "Direct Specialist Helpline",
        description: "Speak with certified tech professionals who understand hardware specs, compatibility, and setups."
      },
      {
        title: "Instant Live Chat & WhatsApp",
        description: "Get real-time answers for order tracking, specifications, compatibility, and accessories."
      },
      {
        title: "Pre-Purchase Buying Advice",
        description: "Not sure which MacBook M4 spec or camera lens suits you? Our specialists provide unbiased advice."
      },
      {
        title: "Post-Purchase Setup Guidance",
        description: "Complimentary setup support for OS installation, data transfer, and configuration."
      }
    ],
    faqs: [
      {
        q: "How do I contact support?",
        a: "Call us anytime at +91 98765 43210 or email support@jgnstore.com with your Order ID."
      },
      {
        q: "Are the support agents humans?",
        a: "Yes! You will connect directly with trained human tech specialists based in Gurugram, India."
      }
    ]
  }
};

const PolicyModal = ({ isOpen, onClose, policyType = "shipping" }) => {
  if (!isOpen) return null;

  const currentPolicy = policyData[policyType] || policyData.shipping;
  const Icon = currentPolicy.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-orange-500/40 shadow-2xl space-y-4 sm:space-y-6 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 sm:p-2 rounded-full bg-gray-800/90 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700 transition"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5 pr-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 p-0.5 shadow-lg shadow-orange-500/20 shrink-0">
            <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center text-orange-400">
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-2xl font-black text-white">
                {currentPolicy.title}
              </h2>
            </div>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold border ${currentPolicy.badgeColor}`}
            >
              {currentPolicy.badge}
            </span>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {currentPolicy.subtitle}
            </p>
          </div>
        </div>

        {/* Core Policy Highlights */}
        <div className="space-y-2.5 sm:space-y-3 pt-2 border-t border-gray-800">
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Key Highlights & Benefits</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {currentPolicy.features.map((item, index) => (
              <div
                key={index}
                className="p-3 sm:p-3.5 rounded-xl bg-gray-900/90 border border-gray-800/90 space-y-1 hover:border-orange-500/30 transition"
              >
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed pl-3">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        {currentPolicy.faqs && currentPolicy.faqs.length > 0 && (
          <div className="space-y-2.5 pt-2 border-t border-gray-800">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-orange-400" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-2">
              {currentPolicy.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 text-xs space-y-1"
                >
                  <p className="font-bold text-gray-200">Q: {faq.q}</p>
                  <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed">
                    A: {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Contact & Action */}
        <div className="pt-3 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-400 text-[11px] sm:text-xs">
            <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
            <span>Need help? Call <strong>+91 98765 43210</strong></span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-600/30 transition active:scale-95 cursor-pointer"
          >
            Got It, Thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
