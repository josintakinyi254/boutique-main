import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, Mail, Phone, Send } from "lucide-react";
import { toast } from "sonner";

const Support = () => {
  const [ticketData, setTicketData] = useState({
    subject: "",
    message: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to create support ticket
    toast.success("Support ticket submitted! We'll get back to you soon.");
    setTicketData({ subject: "", message: "", email: "" });
  };

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by visiting the 'Order Tracking' page in your profile. Enter your order number or sign in to see all your orders and their current status.",
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all items. Products must be unused and in original packaging. To initiate a return, contact our support team or visit the Returns section in your profile.",
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-5 business days, while express delivery takes 1-2 business days. Delivery times may vary depending on your location.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept M-PESA, Visa, Mastercard, and bank transfers. All payments are secure and encrypted.",
    },
    {
      question: "How do I use a voucher code?",
      answer: "Enter your voucher code at checkout in the 'Apply Voucher' section. The discount will be automatically applied to your order total.",
    },
    {
      question: "Can I change my delivery address?",
      answer: "You can change your delivery address in the Address Book section of your profile before placing an order. For orders already placed, contact support immediately.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-heading font-bold mb-8 text-center animate-fade-in">
            Customer Support
          </h1>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Submit a Ticket
                </CardTitle>
                <CardDescription>
                  Have a question? Send us a message and we'll respond within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={ticketData.email}
                      onChange={(e) => setTicketData({ ...ticketData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      value={ticketData.subject}
                      onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or question..."
                      rows={6}
                      value={ticketData.message}
                      onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Get in touch with our support team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <a href="mailto:support@elegante.com" className="text-muted-foreground hover:text-primary">
                        support@elegante.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <a href="tel:+254712345678" className="text-muted-foreground hover:text-primary">
                        +254 712 345 678
                      </a>
                      <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm EAT</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MessageSquare className="h-5 w-5 mt-1 text-primary" />
                    <div>
                      <p className="font-medium">WhatsApp Support</p>
                      <a
                        href="https://wa.me/254712345678"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary"
                      >
                        +254 712 345 678
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
