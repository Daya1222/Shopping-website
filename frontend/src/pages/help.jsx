import React, { useState } from "react";
import {
  Search,
  Package,
  RefreshCw,
  User,
  CreditCard,
  ShoppingBag,
  Settings,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
} from "lucide-react";

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaqs, setOpenFaqs] = useState({});

  const categories = [
    {
      id: "orders",
      icon: Package,
      title: "Orders & Shipping",
      desc: "Track orders, shipping info, and delivery questions",
    },
    {
      id: "returns",
      icon: RefreshCw,
      title: "Returns & Refunds",
      desc: "Return policy, refund process, and exchanges",
    },
    {
      id: "account",
      icon: User,
      title: "Account & Security",
      desc: "Login issues, password reset, and account settings",
    },
    {
      id: "payment",
      icon: CreditCard,
      title: "Payment & Billing",
      desc: "Payment methods, billing questions, and invoices",
    },
    {
      id: "products",
      icon: ShoppingBag,
      title: "Products & Stock",
      desc: "Product information, availability, and recommendations",
    },
    {
      id: "technical",
      icon: Settings,
      title: "Technical Support",
      desc: "Website issues, app problems, and troubleshooting",
    },
  ];

  const faqs = {
    orders: [
      {
        q: "How do I track my order?",
        a: "You can track your order by logging into your account and visiting the \"My Orders\" section. Click on the order you want to track, and you'll see real-time tracking information. You'll also receive tracking updates via email once your order ships.",
      },
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-7 business days. Express shipping delivers in 2-3 business days. Orders are processed within 24 hours on business days. You'll receive an email confirmation with estimated delivery dates once your order ships.",
      },
      {
        q: "Can I change my shipping address?",
        a: "If your order hasn't shipped yet, you can update the shipping address by contacting our support team immediately. Once the order has shipped, we cannot modify the address, but you may be able to redirect it through the carrier's tracking portal.",
      },
    ],
    returns: [
      {
        q: "What is your return policy?",
        a: 'We offer a 30-day return policy for most items. Products must be unused, in original packaging, and with all tags attached. To start a return, visit your order history and click "Request Return." Some items like personalized products or final sale items cannot be returned.',
      },
      {
        q: "How do I get a refund?",
        a: "Once we receive and inspect your return, we'll process your refund within 5-7 business days. The refund will be issued to your original payment method. You'll receive an email confirmation when the refund is processed.",
      },
      {
        q: "Who pays for return shipping?",
        a: "For defective or incorrect items, we provide a prepaid return label. For other returns, standard return shipping fees apply. We'll deduct the shipping cost from your refund unless you have a premium membership which includes free returns.",
      },
    ],
    account: [
      {
        q: "I forgot my password. How do I reset it?",
        a: "Click \"Forgot Password\" on the login page and enter your email address. We'll send you a password reset link. If you don't receive the email within a few minutes, check your spam folder or contact support.",
      },
      {
        q: "How do I update my account information?",
        a: 'Log into your account and navigate to "Settings." There you can update your email, phone number, shipping addresses, and payment methods. Remember to save your changes before exiting.',
      },
      {
        q: "Can I delete my account?",
        a: 'Yes, you can request account deletion by going to Settings and selecting "Delete Account." Please note this action is permanent and will remove all your order history and saved information. You\'ll need to complete or cancel any active orders first.',
      },
    ],
    payment: [
      {
        q: "What payment methods do you accept?",
        a: "Payment is on delivery so we do not accept any payment method yet.",
      },
    ],
    products: [
      {
        q: "How do I know if an item is in stock?",
        a: 'Stock availability is shown on each product page. If an item is out of stock, you\'ll see an "Out of Stock" button.',
      },
      {
        q: "Can I save items for later?",
        a: "Yes! Click the heart icon on any product to add it to your wishlist. You can access your saved items anytime from your account. You'll also receive notifications when items on your wishlist go on sale.",
      },
    ],
    technical: [
      {
        q: "The website isn't loading properly. What should I do?",
        a: "Try clearing your browser cache and cookies, then refresh the page. Make sure you're using an updated browser (Chrome, Safari, Firefox, or Edge). If issues persist, try a different browser or device, or contact our technical support team.",
      },
      {
        q: "Is there a mobile app?",
        a: "No, we currently do not have a mobile, you are recommended to use the website.",
      },
      {
        q: "I'm not receiving your emails. Help!",
        a: "First, check your spam or junk folder. Add our email address to your contacts to ensure future emails reach your inbox. You can also verify your email address is correct in your account settings. If you still have issues, contact support and we'll resend important order confirmations.",
      },
    ],
  };

  const toggleFaq = (category, index) => {
    const key = `${category}-${index}`;
    setOpenFaqs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filterFaqs = (faqList) => {
    if (!searchTerm) return faqList;
    return faqList.filter(
      (faq) =>
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #77AF57 0%, #6a9d4f 50%, #5d8b47 100%)",
      }}
      className="min-h-screen p-5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center text-white mb-12 pt-10 pb-8">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            How Can We Help?
          </h1>
          <p className="text-xl mb-8 opacity-95">
            Find answers to common questions or get in touch with our support
            team
          </p>

          {/* Search Box */}
        </header>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                style={{ borderWidth: "0px" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderWidth = "2px")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderWidth = "0px")
                }
              >
                <Icon style={{ color: "#77AF57" }} className="w-12 h-12 mb-4" />
                <h2
                  style={{ color: "#77AF57" }}
                  className="text-2xl font-bold mb-3"
                >
                  {cat.title}
                </h2>
                <p className="text-gray-600">{cat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* FAQ Sections */}
        {Object.keys(faqs).map((categoryKey) => {
          const filteredFaqs = filterFaqs(faqs[categoryKey]);
          if (searchTerm && filteredFaqs.length === 0) return null;

          return (
            <section key={categoryKey} id={categoryKey} className="mb-8">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openFaqs[`${categoryKey}-${index}`];
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl mb-4 shadow-lg overflow-hidden"
                  >
                    <div
                      onClick={() => toggleFaq(categoryKey, index)}
                      className="flex justify-between items-center p-6 cursor-pointer hover:bg-green-50 transition-colors duration-200"
                    >
                      <span className="font-semibold text-gray-800 text-lg">
                        {faq.q}
                      </span>
                      <ChevronDown
                        style={{ color: "#77AF57" }}
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        size={24}
                      />
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-96 p-6 pt-0" : "max-h-0"
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                );
              })}
            </section>
          );
        })}

        {/* Contact Section */}
        <div className="bg-white rounded-2xl p-10 mt-12 text-center shadow-xl">
          <h2 style={{ color: "#77AF57" }} className="text-3xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-gray-600 mb-8">
            Our customer support team is here to assist you
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              style={{ backgroundColor: "#77AF57" }}
              className="flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#6a9d4f")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#77AF57")
              }
            >
              <MessageCircle size={20} />
              Live Chat
            </button>
            <button
              style={{ color: "#77AF57", borderColor: "#77AF57" }}
              className="flex items-center gap-2 bg-white px-8 py-4 rounded-full font-semibold shadow-lg border-2 transition-all duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#77AF57";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#77AF57";
              }}
            >
              <Mail size={20} />
              Email Us
            </button>
            <button
              style={{ color: "#77AF57", borderColor: "#77AF57" }}
              className="flex items-center gap-2 bg-white px-8 py-4 rounded-full font-semibold shadow-lg border-2 transition-all duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#77AF57";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#77AF57";
              }}
            >
              <Phone size={20} />
              Call Us
            </button>
          </div>

          <p className="text-gray-500">
            <strong>Hours:</strong> Monday-Friday 9am-8pm EST | Saturday-Sunday
            10am-6pm EST
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
